import './App.css'
import Navbar from './components/Navbar'
import VendorRegister from './components/VendorRegister'
import Citizen from './components/Citizen'
import CitizenSearch from './components/CitizenSearch'
import Login from './components/Login.jsx'
import CitizenDashboard from './components/CitizenDashboard'
import Favourites from './components/Favourites'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<CitizenDashboard />}></Route>
            <Route path ="/vendor-form" element={<VendorRegister></VendorRegister>}></Route>
            <Route path ="/citizen-form" element={<Citizen></Citizen>}></Route>
            <Route path ="/citizen-search" element={<CitizenSearch></CitizenSearch>}></Route>
            <Route path ="/login" element={<Login></Login>}></Route>
            <Route path="/citizen-dashboard" element={<CitizenDashboard />}>
              <Route index element={<CitizenSearch />} />
              <Route path="search" element={<CitizenSearch />} />
              <Route path="favourites" element={<Favourites />} />
            </Route>
    </Routes>
    {/* <Citizen></Citizen> */}
    
  
    </>
  )
}

export default App
