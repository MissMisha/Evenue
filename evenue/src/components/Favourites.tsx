import { useEffect, useState } from "react"
import VendorCard from "./VendorCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// interface favourite{
//     email:string;
//     vendors:[string]
// }
 interface vendor{
        email: string,
        name: string,
        contactNumber: number,
        businessDetails: string,
        businessName: string,
        area: string,
        address: string,
        city:string,
        establishedIn: number,
        categories: string[],
        websiteUrl: string,
        instagramId: string,
        shopPicture: string,
        businessCertificate: string
    }
function Favourites() {
    const [favourites,setFavourites] = useState(false);
    const [fvrtVendors,setfavrtVendors] = useState<vendor[]>([]);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (!toastMessage) {
        return
      }

      const timeoutId = window.setTimeout(() => {
        setToastMessage("")
        navigate("/login")
      }, 2500)

      return () => window.clearTimeout(timeoutId)
    }, [navigate, toastMessage])

    useEffect(() => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null")
        const email = user?.email

        if (!email) {
          setToastMessage("Please log in to view your favourites.")
          return
        }

        fetchFavourites(email)
      } catch (error) {
        console.error("Unable to read logged-in user:", error)
        setToastMessage("Please log in to view your favourites.")
      }
    }, [])

    function getCards(ary:string[]){
         axios.post("http://localhost:2001/vendor/getfavrtCards",{
            ary:ary
         })
        .then((res)=>{
            console.log(res)
            setfavrtVendors(res.data.doc) 
        })
    }

    // fetch the document of specific user from favourites collection 
    function fetchFavourites(email:string){
      const token = localStorage.getItem("token")
        axios.get("http://localhost:2001/vendor/getfavrts",{
           params: {email},
             headers: {
           authorization: `Bearer ${token}`
            }
    })
        .then((res)=>{
            console.log(res)
            if (res.data.msg === "Session expired" || res.data.msg === "Token missing or invalid") {
              setToastMessage("Your session has expired. Please log in again.")
              return
            }

            if (res.data.doc?.[0]?.vendors) {
              getCards(res.data.doc[0].vendors)  // I need all emails I want to retrieve
            }
            setFavourites(true)
        }).catch((err)=>{
            console.log(err)
            if (err.response?.status === 401) {
              setToastMessage("Your session has expired. Please log in again.")
            }
        })
    }


  return (
    <div className="dashboard-favourites">
      {toastMessage && (
        <div className="session-toast" role="alert">
          <span className="session-toast-icon" aria-hidden="true">!</span>
          <span>{toastMessage}</span>
        </div>
      )}
      <div className="dashboard-page-heading">
        <p>Citizen dashboard</p>
        <h1>My favourites</h1>
        <span>Your saved service providers will appear here.</span>
      </div>

      <div className="favourites-list">
        <div className="dashboard-content-card">
          
           
             {favourites==false?
                (
                <>
                <div className="dashboard-empty-icon">♡</div>
                <h2>No favourites yet</h2>
                </>):
             (fvrtVendors.map((vendor) => (
              <VendorCard key={vendor.email} vendor={vendor} />)
            )
            )}
          <p>Save service providers here to find them quickly later.</p>
        </div>
      </div>
    </div>
  )
}

export default Favourites
