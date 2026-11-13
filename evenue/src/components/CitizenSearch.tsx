import { useEffect, useState } from 'react'
import axios from 'axios'
import VendorCard from './VendorCard'
import { useNavigate } from 'react-router-dom';


function CitizenSearch() {
    interface Event{
        event:string;
        services:string[];
    }
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
  const [selectedEvent, setSelectedEvent] = useState('')
  const [events,setEvents] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])
  const [selectedService, setSelectedService] = useState('')
  const [vendors,setVendors] = useState<vendor[]>([])
  const [toastMessage, setToastMessage] = useState('')
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPage,setShowPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
      navigate('/login')
    }, 2500)

    return () => window.clearTimeout(timeoutId)
  }, [navigate, toastMessage])

  useEffect(() => {
    showVendors(selectedService, currentPage);
}, [selectedService, currentPage]);

  useEffect(()=>{
    axios.post("http://localhost:2001/citizen/saveEvents").then((res)=>{   // if not present then save otherwise return them
            // console.log(res.data.doc)
            const ary:Event[] = res.data.doc
            setEvents(ary.map((item) => item.event))
    }).catch((err)=>{
        console.log(err)
    }) 
 },[])

 async function showServices(name:string){
   const token = localStorage.getItem("token")
   await axios.get("http://localhost:2001/citizen/fetchServices",{
    params:{event:name},
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res)=>{
       // console.log(res.data)
       if(res.data.msg == "Session expired"){
        setToastMessage('Your session has expired. Please log in again.')
        // navigate("/login")
       }
       
        setServices(res.data.doc.services)
       setSelectedService('')
    }).catch((err)=>{
        console.log(err)
    })
 }

 async function showVendors(service:string,page:number){
    // console.log("hii")
     const token = localStorage.getItem("token")
    await axios.get("http://localhost:2001/citizen/fetchVendors",{
      params:{service:service,page:page},
       headers: {
      authorization: `Bearer ${token}`,
    },
    }).then((res)=>{
       if(res.data.msg == "Session expired"){
        setToastMessage('Your session has expired. Please log in again.')
        // navigate("/login")
       }
        if (!Array.isArray(res.data.doc)) {
          console.error("Vendor response did not contain a vendor list:", res.data)
          setVendors([])
          return
        }

        console.log(res.data)
        setVendors(res.data.doc)
        setTotalPages(res.data.totalPages)

        // console.log(vendors)
    }).catch((err)=>{
        console.log(err)
    })

 }
  
  return (
    <main className="citizen-search-page">
      {toastMessage && (
        <div className="session-toast" role="alert">
          <span className="session-toast-icon" aria-hidden="true">!</span>
          <span>{toastMessage}</span>
          
        </div>
      )}
      <section className="citizen-search-layout">
        <aside className="citizen-search-sidebar">
          <div className="citizen-search-heading">
            <p>Event services</p>
            <h1>Find services</h1>
            <span>Choose an event to view the services commonly required.</span>
          </div>

          <label className="citizen-event-field" htmlFor="event">
            Select event
            <select
              id="event"
              value={selectedEvent}
              onChange={(event) =>{
                setSelectedEvent(event.target.value);
                showServices(event.target.value);
              }}
              
            >
              <option value="">Choose an event</option>
              {events.map((event, index) => (
                <option key={`${event}-${index}`} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </label>

          <section className="citizen-services-panel">
            <div className="citizen-services-heading">
              <h2>Required services</h2>
              
            </div>
            {services.length > 0 ? (
              <div className="citizen-services-list">
                {services.map((service) => (
                  <label className="citizen-service-option" key={service}>
                    <input
                      type="radio"
                      name="selected-service"
                      value={service}
                      checked={selectedService === service}
                      onChange={
                        (event) => {setSelectedService(event.target.value);
                        showVendors(event.target.value, currentPage);
                        setShowPage(true)
                        }}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="citizen-services-empty">
                Select an event to view services.
              </p>
            )}
          </section>
        </aside>

        <section className="citizen-search-results">
          <div className="citizen-results-heading">
            <p>Service directory</p>
            <h2>{selectedEvent || 'Select an event to continue'}</h2>
            <span>
              {selectedEvent
                ? 'Services for your selected event will appear here.'
                : 'Choose an event from the left to explore relevant services.'}
            </span>
          </div>
          <div className="vendor-card-list">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.email} vendor={vendor} />
            ))}
          </div>
          {/* Paging html code  */}
           {showPage && <div className="citizen-pagination">
              <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
              >
                  Previous
              </button>

              <span>
                  {currentPage} / {totalPages}
              </span>

              <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
              >
                  Next
              </button>
        </div>}
        </section>
      </section>
    </main>
  )
}

export default CitizenSearch
