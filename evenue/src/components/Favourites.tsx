import { useState } from "react"
import VendorCard from "./VendorCard";
import axios from "axios";

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
    const [email,setEmail] = useState("");

    function getCards(ary:[string]){
         axios.post("http://localhost:2001/vendor/getfavrtCards",{
            ary:ary
         })
        .then((res)=>{
            console.log(res)
            setfavrtVendors(res.data.doc) 
        })
    }

    // fetch the document of specific user from favourites collection 
    function fetchFavourites(){
        axios.get("http://localhost:2001/vendor/getfavrts",{
            params: {email}
        })
        .then((res)=>{
            console.log(res)
            getCards(res.data.doc[0].vendors)  // I need all emails I want to retrieve 
            setFavourites(true)
        }).catch((err)=>{
            console.log(err)
        })
    }


  return (
    <div className="dashboard-favourites">
      <div className="dashboard-page-heading">
        <p>Citizen dashboard</p>
        <h1>My favourites</h1>
        <span>Your saved service providers will appear here.</span>
      </div>

      <label className="favourites-email-field" htmlFor="favourites-email">
        Email ID
        <div className="favourites-email-controls">
          <input
            id="favourites-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            onChange={((e)=>setEmail(e.target.value))}
          />
          <button className="favourites-search-button" type="button"
          onClick={fetchFavourites}>
            Find favourites
          </button>
        </div>
      </label>

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
