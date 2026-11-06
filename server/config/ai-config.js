require("dotenv").config();
const {GoogleGenAI} = require("@google/genai")

const apiKey = process.env.gemini_key
const ai = apiKey ? new GoogleGenAI({apiKey}) : null


const FRONT_EXTRACTION_PROMPT = `Extract only these details from the front side of the Aadhaar card. Return valid JSON only:
{
  "citizenName": "Full Name in English or null",
  "citizenDob": "YYYY-MM-DD or DD/MM/YYYY or null",
  "citizenGender": "Male" | "Female" | "Other" | null,
  "citizenAcardno": "12-digit number without spaces or null",
  "confidenceScore": 0.95
}`;

const BACK_EXTRACTION_PROMPT = `Extract only these details from the back side of the Aadhaar card. Return valid JSON only:
{
  "citizenAddress": {
    "fullAddress": "Full street and locality address or null",
    "city": "City or District or null",
    "state": "State or null",
    "pincode": "6-digit PIN code or null"
  },
  "citizenContact": "Contact number if visible, otherwise null",
  "confidenceScore": 0.95
}`;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models"
const OPENROUTER_MODEL = "openrouter/free"
const OPENROUTER_TIMEOUT_MS = 30000
let openRouterImageSupportCache = null

const createProviderError = (message, status, code) => {
    const error = new Error(message)
    error.status = status
    error.code = code
    return error
}

async function fetchWithTimeout(url, options, timeoutMs = OPENROUTER_TIMEOUT_MS) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
        return await fetch(url, {...options, signal: controller.signal})
    } catch (error) {
        if (error.name === "AbortError") {
            throw createProviderError("OpenRouter request timed out.", 504, "OPENROUTER_TIMEOUT")
        }
        throw error
    } finally {
        clearTimeout(timeoutId)
    }
}

async function ensureOpenRouterImageSupport(apiKey) {
    if (openRouterImageSupportCache) {
        return
    }

    const response = await fetchWithTimeout(OPENROUTER_MODELS_URL, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    })

    if (!response.ok) {
        throw createProviderError("Unable to verify OpenRouter model capabilities.", 502, "OPENROUTER_MODELS_ERROR")
    }

    const body = await response.json()
    const model = body.data?.find((item) => item.id === OPENROUTER_MODEL)
    const inputModalities = model?.architecture?.input_modalities || []

    if (!model || !inputModalities.includes("image")) {
        throw createProviderError(
            "The configured OpenRouter free model does not support image input.",
            503,
            "OPENROUTER_IMAGE_UNSUPPORTED",
        )
    }

    openRouterImageSupportCache = true
}

function getOpenRouterPrompt(side) {
    return `Extract only the visible Aadhaar details from the ${side} side image.
Return valid JSON only. Do not include markdown, explanations, or extra keys.
Use null for unreadable or missing values. Never guess or infer values.
${
        side === "front"
            ? `Return exactly:
{
  "citizenName": "Full Name in English or null",
  "citizenDob": "YYYY-MM-DD or DD/MM/YYYY or null",
  "citizenGender": "Male" | "Female" | "Other" | null,
  "citizenAcardno": "12-digit number without spaces or null",
  "confidenceScore": 0.0
}`
            : `Return exactly:
{
  "citizenAddress": {
    "fullAddress": "Full street and locality address or null",
    "city": "City or District or null",
    "state": "State or null",
    "pincode": "6-digit PIN code or null"
  },
  "citizenContact": "Contact number if visible, otherwise null",
  "confidenceScore": 0.0
}`
    }`
}

function parseJsonResponse(text) {
    const cleanedText = text
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")

    try {
        return JSON.parse(cleanedText)
    } catch {
        throw createProviderError("OpenRouter returned malformed JSON.", 502, "OPENROUTER_INVALID_JSON")
    }
}

function validateExtractedDetails(details, side) {
    if (!details || typeof details !== "object" || Array.isArray(details)) {
        throw createProviderError("OpenRouter returned an invalid extraction response.", 502, "OPENROUTER_INVALID_DATA")
    }

    if (side === "front") {
        const validGender = details.citizenGender === null
            || ["Male", "Female", "Other"].includes(details.citizenGender)
        const validAadhaar = details.citizenAcardno === null
            || /^\d{12}$/.test(details.citizenAcardno)

        if (typeof details.citizenName !== "string" && details.citizenName !== null
            || typeof details.citizenDob !== "string" && details.citizenDob !== null
            || !validGender
            || !validAadhaar) {
            throw createProviderError("OpenRouter returned invalid Aadhaar fields.", 502, "OPENROUTER_INVALID_DATA")
        }
    } else {
        const address = details.citizenAddress
        if (!address || typeof address !== "object"
            || typeof address.fullAddress !== "string" && address.fullAddress !== null
            || typeof address.city !== "string" && address.city !== null
            || typeof address.state !== "string" && address.state !== null
            || typeof address.pincode !== "string" && address.pincode !== null
            || typeof details.citizenContact !== "string" && details.citizenContact !== null) {
            throw createProviderError("OpenRouter returned invalid Aadhaar fields.", 502, "OPENROUTER_INVALID_DATA")
        }
    }

    return details
}

async function extractAadhaarDetailsWithOpenRouter(file, side) {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
        throw createProviderError(
            "OpenRouter API key is not configured. Add OPENROUTER_API_KEY to server/.env.",
            500,
            "OPENROUTER_KEY_MISSING",
        )
    }

    await ensureOpenRouterImageSupport(apiKey)

    const imageDataUrl = `data:${file.mimetype};base64,${file.data.toString("base64")}`
    const requestBody = {
        model: OPENROUTER_MODEL,
        messages: [{
            role: "user",
            content: [
                {type: "text", text: getOpenRouterPrompt(side)},
                {type: "image_url", image_url: {url: imageDataUrl}},
            ],
        }],
        temperature: 0,
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const response = await fetchWithTimeout(OPENROUTER_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            const body = await response.json().catch(() => null)
            if (!response.ok) {
                const providerStatus = body?.error?.code || response.status
                const transient = response.status === 429 || response.status === 503 || response.status === 504
                if (transient && attempt < 2) {
                    await wait(1000 * (attempt + 1))
                    continue
                }
                throw createProviderError(
                    "OpenRouter provider request failed.",
                    response.status >= 500 ? 503 : response.status,
                    `OPENROUTER_PROVIDER_${providerStatus}`,
                )
            }

            const text = body?.choices?.[0]?.message?.content
            if (typeof text !== "string" || !text.trim()) {
                throw createProviderError("OpenRouter returned no extraction content.", 502, "OPENROUTER_EMPTY_RESPONSE")
            }

            return validateExtractedDetails(parseJsonResponse(text), side)
        } catch (error) {
            if (error.code === "OPENROUTER_TIMEOUT" && attempt < 2) {
                await wait(1000 * (attempt + 1))
                continue
            }
            throw error
        }
    }

    throw createProviderError("OpenRouter request failed after retries.", 503, "OPENROUTER_RETRIES_EXHAUSTED")
}

async function extractAadhaarDetails(file, side) {
    if (!ai) {
        throw new Error("Gemini API key is not configured. Add gemini_key to server/.env")
    }

    const request = {
        model: "gemini-3.8-flash",
        contents: [{
            inlineData: {
                mimeType: file.mimetype,
                data: file.data.toString("base64")
            }
        }, {
            text: side === "front" ? FRONT_EXTRACTION_PROMPT : BACK_EXTRACTION_PROMPT
        }]
    }

    let response
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            response = await ai.models.generateContent(request)
            break
        } catch (error) {
            const isTransient = error?.status === 503 || error?.status === 429
            if (!isTransient || attempt === 2) {
                throw error
            }
            await wait(1000 * (attempt + 1))
        }
    }

    const text = response.text
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")

    return JSON.parse(text)
}

module.exports = {extractAadhaarDetails, extractAadhaarDetailsWithOpenRouter}