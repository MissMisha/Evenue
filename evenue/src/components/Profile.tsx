import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type UserDetails = {
  email: string
  aCardNo: string
  name: string
  dob: string
  gender: string
  address: string
  city: string
  contact: string
}

function Profile() {
  const navigate = useNavigate()
  const [details, setDetails] = useState<UserDetails | null>(null)
  const [message, setMessage] = useState('Loading profile...')

  useEffect(() => {
    async function fetchProfile() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        const email = user?.email

        if (!email) {
          setMessage('Please log in to view your profile.')
          return
        }

        const response = await axios.get(
          'http://localhost:2001/citizen/getUserDetails',
          { params: { email } },
        )

        if (response.data?.status === false || !response.data?.doc) {
          setMessage(response.data?.msg || 'Profile details were not found.')
          return
        }

        setDetails(response.data.doc)
        setMessage('')
      } catch (error) {
        console.error('Unable to fetch profile details:', error)
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.msg
          : ''
        setMessage(errorMessage || 'Unable to load your profile.')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="dashboard-profile">
      <div className="dashboard-page-heading">
        <p>Citizen dashboard</p>
        <h1>My profile</h1>
        <span>Your saved citizen details are shown here.</span>
      </div>  
      <div className="dashboard-content-card profile-details-card">
        {details ? (
          <>
            <div className="profile-details-grid">
            <div><span>Email</span><strong>{details.email}</strong></div>
            <div><span>Name</span><strong>{details.name}</strong></div>
            <div><span>Aadhaar card number</span><strong>{details.aCardNo}</strong></div>
            <div><span>Date of birth</span><strong>{details.dob}</strong></div>
            <div><span>Gender</span><strong>{details.gender}</strong></div>
            <div><span>Contact number</span><strong>{details.contact}</strong></div>
            <div><span>City</span><strong>{details.city}</strong></div>
            <div className="profile-details-wide">
              <span>Address</span>
              <strong>{details.address}</strong>
            </div>
            </div>
            <button
              className="profile-action-button"
              type="button"
              onClick={() => navigate('../profile', { state: { details } })}
            >
              Update your details
            </button>
          </>
        ) : (
          <>
            <p>{message}</p>
            {message !== 'Loading profile...' && (
              <button
                className="profile-action-button"
                type="button"
                onClick={() => navigate('../profile')}
              >
                Complete your profile
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
