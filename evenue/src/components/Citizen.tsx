import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

type CitizenValues = {
  email: string
  aCardNo: string
  name: string
  dob: string
  gender: string
  address: string
  city: string
  contact: string
  frontSide: File | null
  backSide: File | null
}

function Citizen() {
  const [values, setValues] = useState<CitizenValues>({
    email: '',
    aCardNo: '',
    name: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    contact: '',
    frontSide: null,
    backSide: null,
  })
  const [frontPreview, setFrontPreview] = useState('')
  const [backPreview, setBackPreview] = useState('')
  const [message, setMessage] = useState('')
  const [extractingSide, setExtractingSide] = useState<'frontSide' | 'backSide' | null>(null)

  const updateField = (field: keyof CitizenValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const processAadhaarImage = async (file: File, side: 'frontSide' | 'backSide') => {
    const formData = new FormData()
    formData.append('aadhaarImage', file)
    formData.append('side', side === 'frontSide' ? 'front' : 'back')

    try {
      setExtractingSide(side)
      setMessage('Extracting Aadhaar information...')
      const response = await axios.post(
        'http://localhost:2001/citizen/extractAadhaar',
        formData,
      )
      const details = response.data.details
      if (!details) {
        throw new Error('No Aadhaar details were returned.')
      }

      setValues((current) => side === 'frontSide'
        ? {
            ...current,
            aCardNo: details.citizenAcardno || current.aCardNo,
            name: details.citizenName || current.name,
            dob: toInputDate(details.citizenDob) || current.dob,
            gender: normalizeGender(details.citizenGender) || current.gender,
          }
        : {
            ...current,
            address: details.citizenAddress?.fullAddress || current.address,
            city: details.citizenAddress?.city || current.city,
            contact: details.citizenContact || current.contact,
          })
      setMessage('Aadhaar details filled successfully.')
    } catch (error) {
      console.error('Error processing Aadhaar image:', error)
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.msg
        : ''
      setMessage(errorMessage || 'Unable to process Aadhaar image.')
    } finally {
      setExtractingSide(null)
    }
  }

  const updateCardImage = async (
    event: ChangeEvent<HTMLInputElement>,
    side: 'frontSide' | 'backSide',
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setValues((current) => ({ ...current, [side]: file }))
    const preview = URL.createObjectURL(file)

    if (side === 'frontSide') {
      setFrontPreview(preview)
    } else {
      setBackPreview(preview)
    }

    await processAadhaarImage(file, side)
  }

  const toInputDate = (date: string | null | undefined) => {
    if (!date) return ''
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date

    const parts = date.split('/')
    if (parts.length === 3) {
      const [day, month, year] = parts
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    return ''
  }

  const normalizeGender = (gender: string | null | undefined) => {
    if (!gender) return ''
    return gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female'
      ? gender.toLowerCase()
      : 'other'
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('Citizen details uploaded successfully.')
  }

  return (
    <main className="citizen-page">
      <section className="citizen-card">
        <div className="citizen-top-bar" />

        <form className="citizen-form" onSubmit={handleSubmit}>
          <div className="citizen-heading">
            <p>Citizen services</p>
            <h1>Register citizen details</h1>
            <span>Upload your Aadhaar information and contact details.</span>
          </div>

          <div className="citizen-email-row">
            <label htmlFor="citizen-email">Email Id</label>
            <input
              id="citizen-email"
              type="email"
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
            />
            <button className="citizen-fetch-button" type="button">Fetch</button>
          </div>

          <div className="citizen-content">
            <section className="citizen-upload-panel">
              <h2>Upload Aadhaar Card</h2>
              <div className="citizen-card-preview">
                {frontPreview && <img src={frontPreview} alt="Aadhaar card front preview" />}
              </div>
              <p className="citizen-side-label">Upload the front side here</p>
              <label className="citizen-upload-button">
                <span>{extractingSide === 'frontSide' ? 'Extracting...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={extractingSide !== null}
                  onChange={(event) => updateCardImage(event, 'frontSide')}
                />
              </label>

              <div className="citizen-card-preview">
                {backPreview && <img src={backPreview} alt="Aadhaar card back preview" />}
              </div>
              <p className="citizen-side-label">Upload the back side here</p>
              <label className="citizen-upload-button">
                <span>{extractingSide === 'backSide' ? 'Extracting...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={extractingSide !== null}
                  onChange={(event) => updateCardImage(event, 'backSide')}
                />
              </label>
            </section>

            <div className="citizen-details">
              <section className="citizen-details-panel citizen-personal-details">
                <label>
                  Aadhaar Card Number
                  <input
                    type="text"
                    value={values.aCardNo}
                    onChange={(event) => updateField('aCardNo', event.target.value)}
                    required
                  />
                </label>
                <div className="citizen-inline-fields">
                  <label>
                    Name
                    <input
                      type="text"
                      value={values.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    DOB
                    <input
                      type="date"
                      value={values.dob}
                      onChange={(event) => updateField('dob', event.target.value)}
                      required
                    />
                  </label>
                </div>
                <label>
                  Gender
                  <select
                    value={values.gender}
                    onChange={(event) => updateField('gender', event.target.value)}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </section>

              <section className="citizen-details-panel citizen-contact-details">
                <label>
                  Address
                  <textarea
                    value={values.address}
                    onChange={(event) => updateField('address', event.target.value)}
                    rows={2}
                    required
                  />
                </label>
                <label>
                  City
                  <input
                    type="text"
                    value={values.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    required
                  />
                </label>
                <label>
                  Contact Number
                  <input
                    type="tel"
                    value={values.contact}
                    onChange={(event) => updateField('contact', event.target.value)}
                    required
                  />
                </label>
              </section>
            </div>
          </div>

          <div className="citizen-actions">
            <button className="citizen-submit-button" type="submit">Upload Data</button>
            <button
              className="citizen-modify-button"
              type="button"
              onClick={() => setMessage('You can modify the entered details.')}
            >
              Modify
            </button>
          </div>
          {extractingSide && (
            <div className="citizen-extraction-loader" role="status">
              <span className="citizen-loader-spinner" />
              <span>Extracting information from the Aadhaar image...</span>
            </div>
          )}
          {message && <p className="citizen-message" role="status">{message}</p>}
        </form>
      </section>
    </main>
  )
}

export default Citizen
