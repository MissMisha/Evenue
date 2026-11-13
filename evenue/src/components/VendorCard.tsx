import axios from "axios"
import { useEffect, useState } from "react"
import type { ComponentType } from "react"
import { useNavigate } from "react-router-dom"
import ReactStarsModule from "react-rating-stars-component"

type ReactStarsProps = {
  count: number
  value: number
  onChange: (rating: number) => void
  size: number
  char: string
  color: string
  activeColor: string
  edit: boolean
  isHalf?: boolean
}

const ReactStars = (() => {
  let component: unknown = ReactStarsModule

  while (
    component &&
    typeof component !== "function" &&
    typeof component === "object" &&
    "default" in component
  ) {
    component = component.default
  }

  if (typeof component !== "function") {
    throw new Error("Unable to load react-rating-stars-component")
  }

  return component as ComponentType<ReactStarsProps>
})()


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
  ratingSum?: number
  users_rated?: number
}


function VendorCard({ vendor }: { vendor: Vendor }) {
 const navigate = useNavigate();
  const [showFavouritePopup, setShowFavouritePopup] = useState(false)
  const [msg,setMsg] = useState("");
  const [toastMessage,setToastMessage]=useState("")
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(
    vendor.users_rated ? (vendor.ratingSum ?? 0) / vendor.users_rated : 0,
  )
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [isSavingRating, setIsSavingRating] = useState(false)
   
  const categories = Array.isArray(vendor.categories)
    ? vendor.categories
    : vendor.categories
      ? [vendor.categories]
      : []

       useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
      if (toastMessage === 'Your session has expired. Please log in again.') {
        navigate('/login')
      }
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [navigate, toastMessage])


  useEffect(() => {
    setAverageRating(
      vendor.users_rated ? (vendor.ratingSum ?? 0) / vendor.users_rated : 0,
    )
  }, [vendor.ratingSum, vendor.users_rated])

  async function saveRating() {
    if (rating === 0) {
      setToastMessage("Please select a rating first.")
      return
    }

    setIsSavingRating(true)
    try {
      const resp = await axios.post("http://localhost:2001/vendor/saveRating", {
        rating,
        email: vendor.email,
      })
      console.log(resp);

      if (resp.data?.status === false) {
        throw new Error(resp.data.msg || "The rating could not be saved.")
      }

      const currentTotal = vendor.ratingSum ?? 0
      const currentCount = vendor.users_rated ?? 0
      setAverageRating((currentTotal + rating) / (currentCount + 1))
      setRating(0)
      setIsRatingModalOpen(false)
      setMsg("Your rating was saved.")
      setShowFavouritePopup(true)
    } catch (err) {
      console.error("Unable to save rating:", err)
      setToastMessage("Unable to save your rating. Please try again.")
    } finally {
      setIsSavingRating(false)
    }
  }
  async function addToFavourites(){
    // console.log("add");
      try {
        const token = localStorage.getItem("token")
        const res = await axios.post("http://localhost:2001/vendor/savefavrts",
          {
            email: "mishabansal26@gmail.com",
            vendorId: vendor.email},
           { headers: {
           authorization: `Bearer ${token}`,
    }}
        )
         if(res.data.msg == "Session expired"){
        setToastMessage('Your session has expired. Please log in again.')
        // navigate("/login")
       }
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
      {toastMessage && (
        <div className="session-toast" role="alert">
          <span className="session-toast-icon" aria-hidden="true">!</span>
          <span>{toastMessage}</span>
        </div>
      )}
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

        <button
          className="vendor-card-rating"
          type="button"
          onClick={() => setIsRatingModalOpen(true)}
          aria-label={`Rate this vendor. Current rating: ${averageRating.toFixed(1)} out of 5`}
        >
            <ReactStars
              count={5}
              value={averageRating}
              size={24}
              char="★"
              color="#b8b8b8"
              activeColor="#ffd700"
              edit={false}
              isHalf={true}
            />
        
        </button>
      </div>
      {isRatingModalOpen && (
        <div
          className="rating-modal-backdrop"
          role="presentation"
          onClick={() => setIsRatingModalOpen(false)}
        >
          <section
            className="rating-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rating-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="rating-modal-close"
              type="button"
              aria-label="Close rating dialog"
              onClick={() => setIsRatingModalOpen(false)}
            >
              ×
            </button>
            <h2 id="rating-modal-title">Rate {vendor.businessName}</h2>
            <p>How would you rate this vendor?</p>
            <div className="rating-modal-stars">
              <ReactStars
                count={5}
                value={rating}
                onChange={setRating}
                size={32}
                char="★"
                color="#b8b8b8"
                activeColor="#ffd700"
                edit={true}
                isHalf={false}
              />
            </div>
            <button
              className="rating-modal-submit"
              type="button"
              disabled={isSavingRating || rating === 0}
              onClick={saveRating}
            >
              {isSavingRating ? "Saving..." : "Submit rating"}
            </button>
          </section>
        </div>
      )}
      {showFavouritePopup && (
        <div className="favourite-popup" role="status" aria-live="polite">
          <div className="favourite-popup-icon">♡</div>
          <div className="favourite-popup-content">
            <strong>Action Successfull</strong>
            <p>{msg}</p>
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