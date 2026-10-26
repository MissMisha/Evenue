import axios from "axios"
import { useEffect, useState } from "react"
type Vendor = {
  email: string
  name: string
  contactNumber: number
  businessDetails: string
  businessName: string
  area: string
  address: string
  city: string
  establishedIn: number
  categories: string[]
  websiteUrl: string
  instagramId: string
  shopPicture: string
  businessCertificate: string
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  const [showFavouritePopup, setShowFavouritePopup] = useState(false)
  const [msg,setMsg] = useState("");
  const categories = Array.isArray(vendor.categories)
    ? vendor.categories
    : vendor.categories
      ? [vendor.categories]
      : []

  async function addToFavourites(){
      try {
        const res = await axios.post("http://localhost:2001/vendor/savefavrts",{"email":"mia2601@gmail.com","vendorId":vendor.email})
        setShowFavouritePopup(true)
        setMsg(res.data.msg)
        console.log(res)

      } catch (error) {
        console.error("Unable to add vendor to favourites:", error)
      }
  }

  useEffect(() => {
    if (!showFavouritePopup) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowFavouritePopup(false)
    }, 3500)

    return () => window.clearTimeout(timeoutId)
  }, [showFavouritePopup])

  return (
    <article className="vendor-card">
      <div className="vendor-card-image">
        {vendor.shopPicture ? (
          <img src={vendor.shopPicture} alt={`${vendor.businessName} shop`} />
        ) : (
          <span>No shop image</span>
        )}
      </div>

      <div className="vendor-card-details">
        <div className="vendor-card-heading">
          <div>
            <p className="vendor-card-eyebrow">Business profile</p>
            <h2>{vendor.businessName || 'Business name unavailable'}</h2>
          </div>
          <div className="vendor-card-actions">
            {vendor.city && <span className="vendor-card-city">{vendor.city}</span>}
            <button 
              onClick={addToFavourites}
              className="vendor-card-favourite"
              type="button"
              aria-label="Add to favourites"
            >
              ♡
            </button>
          </div>
        </div>

        <p className="vendor-card-description">
          {vendor.businessDetails || 'No business details available.'}
        </p>

        <div className="vendor-card-info-grid">
          <div>
            <span>Email</span>
            <strong>{vendor.email || 'Not provided'}</strong>
          </div>
          <div>
            <span>Contact number</span>
            <strong>{vendor.contactNumber || 'Not provided'}</strong>
          </div>
          <div>
            <span>Owner</span>
            <strong>{vendor.name || 'Not provided'}</strong>
          </div>
          <div>
            <span>Established</span>
            <strong>{vendor.establishedIn || 'Not provided'}</strong>
          </div>
          <div>
            <span>Area</span>
            <strong>{vendor.area || 'Not provided'}</strong>
          </div>
          <div>
            <span>City</span>
            <strong>{vendor.city || 'Not provided'}</strong>
          </div>
          <div className="vendor-card-wide">
            <span>Address</span>
            <strong>{vendor.address || 'Not provided'}</strong>
          </div>
          <div>
            <span>Website</span>
            {vendor.websiteUrl ? (
              <a href={vendor.websiteUrl} target="_blank" rel="noreferrer">
                {vendor.websiteUrl}
              </a>
            ) : (
              <strong>Not provided</strong>
            )}
          </div>
          <div>
            <span>Instagram</span>
            <strong>{vendor.instagramId || 'Not provided'}</strong>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="vendor-card-categories">
            <span>Categories</span>
            <div>
              {categories.map((category) => (
                <span className="vendor-card-category" key={category}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="vendor-card-rating" aria-label="5 out of 5 stars">
          <span aria-hidden="true">★</span>
          <span aria-hidden="true">★</span>
          <span aria-hidden="true">★</span>
          <span aria-hidden="true">★</span>
          <span aria-hidden="true">★</span>
        </div>
      </div>
      {showFavouritePopup && (
        <div className="favourite-popup" role="status" aria-live="polite">
          <div className="favourite-popup-icon">♡</div>
          <div className="favourite-popup-content">
            <strong>{msg}</strong>
            <p>{vendor.businessName || 'This service provider'} {msg}</p>
          </div>
          <button
            className="favourite-popup-close"
            type="button"
            aria-label="Close notification"
            onClick={() => setShowFavouritePopup(false)}
          >
            ×
          </button>
        </div>
      )}
    </article>
  )
}

export default VendorCard