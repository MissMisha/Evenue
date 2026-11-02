import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  // const [menuOpen, setMenuOpen] = useState(false
  const navigate = useNavigate();
  
  return (
   <header className="sticky top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-outline-variant shadow-[0_1px_8px_rgba(36,59,57,0.04)] transition-all">
        <div className="h-20 max-w-[1360px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a className="flex items-center gap-2 group cursor-pointer" href="#home">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-on-primary font-serif text-2xl leading-none select-none pb-0.5 font-bold">
                e
              </span>
            </div>
            <span className="font-serif text-2xl tracking-tight text-on-surface group-hover:text-primary transition-colors font-medium">
              evenue
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="transition-colors text-primary font-semibold text-sm border-b-2 border-primary pb-0.5"
            >
              Home
            </a>
            <a
              href="#categories"
              className="font-medium text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a
              href="#businesses"
              className="font-medium text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Businesses
            </a>
            <a
              href="#how-it-works"
              className="font-medium text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="font-medium text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              About Us
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* <button
                onClick={()=>navigate("/vendor-form")}
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Register Your business    
            </button> */}
            <button
              onClick={()=>{
                 navigate('/signup');
              }}
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Signup Here   
            </button>
            <button
              aria-label="User Account"
              className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>

            {/* Mobile Hamburger Button */}
           
          </div>
        </div>

      
       
      </header>

  )
}

export default Navbar