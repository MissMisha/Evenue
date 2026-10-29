import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

const businessCategories = [
  'Cake',
  'Decoration',
  'Catering',
  'Hall',
  'Idols',
  'Music',
  'Stalls',
  'Security',
  'Cleaning',
  'Photography',
  'Pooja Services'
]

type FormValues = {
  email: string
  name: string
  contactNumber: string
  businessDetails: string
  businessName: string
  area: string
  address: string
  city: string
  establishedIn: string
  categories: string[]
  websiteUrl: string
  instagramId: string
  shopPicture: File | null
  businessCertificate: File | null
}

function VendorRegister() {
  const [values, setValues] = useState<FormValues>({
    email: '',
    name: '',
    contactNumber: '',
    businessDetails: '',
    businessName: '',
    area: '',
    address: '',
    city: '',
    establishedIn: '',
    categories: [],
    websiteUrl: '',
    instagramId: '',
    shopPicture: null,
    businessCertificate: null,
  })
  const[picPrev,setPic] = useState<string|undefined>("")
  const [certificatePrev, setCertificate] = useState<string>('')
  const [message, setMessage] = useState('')

  function doShowPicPrev(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setValues((current) => ({
      ...current,
      shopPicture: file,
    }))
    setPic(URL.createObjectURL(file))
  }

  function doShowCertificatePrev(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setValues((current) => ({
      ...current,
      businessCertificate: file,
    }))
    setCertificate(URL.createObjectURL(file))
  }

  async function fetchDetails(){
    const resp = await axios.get("http://localhost:2001/vendor/fetchDetails",{params:{email:values.email}})
    const obj  = resp.data.details[0];
    console.log(obj)

    setValues(
      {
        email: obj.email,
        name: obj.name,
        contactNumber: obj.contactNumber,
        businessDetails: obj.businessDetails,
        businessName:obj.businessName,
        area: obj.area,
        address: obj.address,
        city: obj.city,
        establishedIn: obj.establishedIn,
        categories: obj.categories,
        websiteUrl: obj.websiteUrl,
        instagramId:obj.instagramId ,
        shopPicture: obj.shopPicture,
        businessCertificate: obj.businessCertificate
      }
    )
    setPic(obj.shopPicture)
    setCertificate(obj.businessCertificate)

    
  }


  const updateField = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleCategoriesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categories = Array.from(event.target.selectedOptions, (option) => option.value)
    setValues((current) => ({ ...current, categories }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((category) => formData.append(key, category))
      } else if (value !== null) {
        formData.append(key, value)
      }
    })

    try {
      const response = await axios.post('http://localhost:2001/vendor/doRegister', formData)
      console.log(response.data)
      setMessage('Business details saved successfully.')
    } catch (error) {
      console.error('Error saving business details:', error)
      setMessage('Unable to save business details.')
    }
  }

  return (
    <main className="registration-page">
      <div className="registration-glow registration-glow-one" />
      <div className="registration-glow registration-glow-two" />
      <section className="registration-hero" aria-labelledby="registration-title">
        <div>
         
          <h1 id="registration-title">Join the evenue community.</h1>
          <p className="registration-hero-copy">
            Share your story, showcase your work, and help people discover the right business for their next
            memorable gathering.
          </p>
        </div>
        <div className="registration-note">
          <span className="material-symbols-outlined">verified</span>
          <div>
            <strong>Curated visibility</strong>
            <span>One profile, more meaningful connections.</span>
          </div>
        </div>
      </section>
      <section className="registration-card">
        <div className="form-heading">
          <p className="eyebrow">Business directory</p>
          <h2>Register your business</h2>
          <p className="form-intro">
            Add your business details to help customers discover and connect with you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Contact information</legend>
            <div className="form-grid">
              <label>
                Email ID <span>*</span>
                <div className="email-fetch-row">
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                  <button 
                  className="secondary-button" 
                  type="button"
                  onClick={fetchDetails}
                  >Fetch</button>
                </div>
              </label>
              <label>
                Name <span>*</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Contact number <span>*</span>
                <input
                  type="tel"
                  value={values.contactNumber}
                  onChange={(event) => updateField('contactNumber', event.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Business information</legend>
            <div className="form-grid">
              <label>
                Business name <span>*</span>
                <input
                  type="text"
                  value={values.businessName}
                  onChange={(event) => updateField('businessName', event.target.value)}
                  placeholder="Enter business name"
                  required
                />
              </label>
              <label>
                Established in
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={values.establishedIn}
                  onChange={(event) => updateField('establishedIn', event.target.value)}
                  placeholder="e.g. 2018"
                />
              </label>
              <label className="full-width">
                Business details <span>*</span>
                <textarea
                  value={values.businessDetails}
                  onChange={(event) => updateField('businessDetails', event.target.value)}
                  placeholder="Tell customers about your business"
                  rows={4}
                  required
                />
              </label>
              <label className="full-width">
                Business categories <span>*</span>
                <select
                  id="categories"
                  multiple
                  value={values.categories}
                  onChange={handleCategoriesChange}
                  required
                >
                  {businessCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <small>Hold Ctrl (Windows) or Cmd (Mac) to select multiple categories.</small>
                <div className="selected-categories" aria-live="polite">
                  {values.categories.length > 0 ? (
                    values.categories.map((category) => (
                      <span className="category-chip" key={category}>
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="empty-selection">Selected categories will appear here</span>
                  )}
                </div>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Business location</legend>
            <div className="form-grid">
              <label>
                Area <span>*</span>
                <input
                  type="text"
                  value={values.area}
                  onChange={(event) => updateField('area', event.target.value)}
                  placeholder="Neighbourhood or area"
                  required
                />
              </label>
              <label>
                City <span>*</span>
                <input
                  type="text"
                  value={values.city}
                  onChange={(event) => updateField('city', event.target.value)}
                  placeholder="Enter city"
                  required
                />
              </label>
              <label className="full-width">
                Address <span>*</span>
                <textarea
                  value={values.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  placeholder="Complete business address"
                  rows={3}
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Online presence & documents</legend>
            <div className="form-grid">
              <label>
                Website URL
                <input
                  type="url"
                  value={values.websiteUrl}
                  onChange={(event) => updateField('websiteUrl', event.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </label>
              <label>
                Instagram ID
                <input
                  type="text"
                  value={values.instagramId}
                  onChange={(event) => updateField('instagramId', event.target.value)}
                  placeholder="@yourbusiness"
                />
              </label>
              <label>
                Shop picture
                <input
                  type="file"
                  name = "shopPicture"
                  accept="image/*"
                  onChange={doShowPicPrev}
                />
                {picPrev && <img src={picPrev} className="shop-picture-preview" alt="Shop picture preview" />}
              </label>
              <label>
                Business certificate
                <input
                  type="file"
                  name = "businessCertificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={doShowCertificatePrev}
                />
                {certificatePrev && (
                  <img src={certificatePrev} className="shop-picture-preview" alt="Business certificate preview" />
                )}
              </label>
            </div>
          </fieldset>

          <div className="form-actions">
            <button className="primary-button" type="submit">Save</button>
          </div>
          {message && <p className="success-message" role="status">{message}</p>}
        </form>
      </section>
    </main>
  )
}

export default VendorRegister