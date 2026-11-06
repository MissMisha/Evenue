import './App.css'
import Navbar from './components/Navbar'
import VendorRegister from './components/VendorRegister'
import Citizen from './components/Citizen'
import CitizenSearch from './components/CitizenSearch'
import Login from './components/Login'
import Signup from './components/Signup'
import CitizenDashboard from './components/CitizenDashboard'
import Favourites from './components/Favourites'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'

function App() {
  const { pathname } = useLocation()

  return (
    <>
    {pathname !== '/home' && <Navbar />}
    <Routes>
        {/* <Route path="/" element={<Navigate to="/citizen-dashboard" replace />} />  */}
        <Route path="/" element={<Navigate to="/home" replace />} /> 
         {/* it initially opens / this route but then it wants it to navigate to /citizen-dashboard */}
            <Route path="/home" element={<Home></Home>}> </Route>
            <Route path ="/vendor-form" element={<VendorRegister></VendorRegister>}></Route>
            <Route path ="/citizen-form" element={<Citizen></Citizen>}></Route>
            <Route path ="/citizen-search" element={<CitizenSearch></CitizenSearch>}></Route>
            <Route path ="/login" element={<Login></Login>}></Route>
            <Route path ="/signup" element={<Signup></Signup>}></Route>
            <Route path="/citizen-dashboard" element={<CitizenDashboard />}>
              <Route index element={<CitizenSearch />} />
              <Route path="search" element={<CitizenSearch />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="profile" element={<Citizen></Citizen>}></Route>
            </Route>
     </Routes>
    {/* <Citizen></Citizen> */}
    
  
    </>
  )
}

export default App
