require("dotenv").config();
const {GoogleGenAI} = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey:process.env.gemini_key
})


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

async function extractAadhaarDetails(file, side) {
    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{
            inlineData: {
                mimeType: file.mimetype,
                data: file.data.toString("base64")
            }
        }, {
            text: side === "front" ? FRONT_EXTRACTION_PROMPT : BACK_EXTRACTION_PROMPT
        }]
    })

    const text = response.text.trim().replace(/^```json\s*/, "").replace(/\s*```$/, "")
    return JSON.parse(text)
}

module.exports = {extractAadhaarDetails}