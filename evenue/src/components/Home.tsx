import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Category item interface
interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
}

// Vendor item interface
interface VendorItem {
  id: string;
  name: string;
  category: string;
  categoryTag: string;
  rating: number;
  reviewsCount: number;
  location: string;
  city: string;
  description: string;
  startingPrice: string;
  priceLabel: string;
  image: string;
}

export const Home: React.FC = () => {
  // Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All Specialist Disciplines');
  const [favoriteVendors, setFavoriteVendors] = useState<Record<string, boolean>>({});
  const [activeCategoryPage, setActiveCategoryPage] = useState(0);
  const [heroFavorite, setHeroFavorite] = useState(false);

  // Toggle Favorite
  const toggleFavorite = (id: string) => {
    setFavoriteVendors((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const navigate = useNavigate();

  // Event Categories Data (8 items)
  const categories: CategoryItem[] = [
    {
      id: 'weddings',
      title: 'Weddings',
      subtitle: '850+ venues & stylists',
      badge: 'Signature',
      image: '/images/wedding-hero.jpg',
    },
    {
      id: 'birthdays',
      title: 'Birthdays',
      subtitle: '420+ cakes & party suites',
      image: '/images/birthday-hero.jpg',
    },
    {
      id: 'festivals',
      title: 'Festivals & Cultural',
      subtitle: '310+ lighting & floral artisans',
      image: '/images/diwali-hero.jpg',
    },
    {
      id: 'concerts',
      title: 'Concerts & Live Fests',
      subtitle: '190+ stages & audio rigs',
      image: '/images/editorial-suite.jpg',
    },
    {
      id: 'anniversaries',
      title: 'Anniversaries',
      subtitle: '160+ sunset terraces',
      image: '/images/anniversaries.jpg',
    },
    {
      id: 'corporate',
      title: 'Corporate Galas',
      subtitle: '280+ banquet spaces',
      image: '/images/corporate-galas.jpg',
    },
    {
      id: 'babyshowers',
      title: 'Baby Showers',
      subtitle: '140+ garden conservatories',
      image: '/images/baby-showers.jpg',
    },
    {
      id: 'soirees',
      title: 'Private Soirées',
      subtitle: '210+ chef residencies',
      image: '/images/private-soirees.jpg',
    },
  ];

  // Event Essentials (10 items)
  const essentials = [
    { name: 'Venues', icon: 'villa', price: 'From $1,200/day', note: 'Estates, barns, lofts' },
    { name: 'Food & Catering', icon: 'restaurant_menu', price: 'From $45/plate', note: 'Tasting menus, buffets' },
    { name: 'Florals & Decor', icon: 'local_florist', price: 'From $600/setup', note: 'Botanical installations' },
    { name: 'Photography', icon: 'photo_camera', price: 'From $900/session', note: 'Drone, film, editorial' },
    { name: 'Music & Sound', icon: 'graphic_eq', price: 'From $500/night', note: 'Live trios, vinyl DJs' },
    { name: 'Hair & Styling', icon: 'brush', price: 'From $200/artist', note: 'Bridal, festival glow' },
    { name: 'Cakes & Sweets', icon: 'cake', price: 'From $120/piece', note: 'Multi-tier, macarons' },
    { name: 'Invitations & Paper', icon: 'mail', price: 'From $3.50/suite', note: 'Letterpress, foil' },
    { name: 'Lighting & FX', icon: 'lightbulb', price: 'From $350/pack', note: 'Fairy canopy, lasers' },
    { name: 'Furniture Rentals', icon: 'chair', price: 'From $15/chair', note: 'Lounge, tableware' },
  ];



  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed flex flex-col">
      {/* ─────────────────────────────────────────────────────────────
          HEADER / NAVBAR
      ───────────────────────────────────────────────────────────── */}
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
            <button
                onClick={()=>navigate("/vendor-form")}
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Register Your business    
            </button>
            <button
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Start Planning     
            </button>
            <button
              aria-label="User Account"
              className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-outline-variant px-6 py-4 shadow-xl space-y-3 animate-in slide-in-from-top duration-200">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-primary py-2"
            >
              Home
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-2"
            >
              Categories
            </a>
            <a
              href="#businesses"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-2"
            >
              Businesses
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-2"
            >
              How It Works
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-on-surface-variant hover:text-primary py-2"
            >
              Register your business
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-primary text-white font-semibold shadow-sm"
            >
              Start Planning
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────────────────────────── */}
      <main className="w-full bg-surface min-h-screen flex-1">
        {/* ─────────────────────────────────────────────────────────────
            1. HERO SECTION
        ───────────────────────────────────────────────────────────── */}
        <section id="home" className="relative w-full overflow-hidden bg-[#FBF6F0] pt-6 pb-20">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#FCECE5]/60 blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 -right-16 w-96 h-96 rounded-full bg-[#E8F5F1]/70 blur-3xl pointer-events-none" />

          <div className="max-w-[1360px] mx-auto px-6 lg:px-12 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Editorial Headline & Actions */}
              <div className="lg:col-span-6 space-y-6 z-10">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#F3E7DC] text-primary shadow-xs">
                  <span className="text-[#D98270] text-sm">✦</span>
                  <span className="text-xs font-semibold tracking-wide text-on-surface-variant">
                    Your Celebration • Curated Sanctuaries
                  </span>
                  <span className="text-[#D98270] text-sm">✦</span>
                </div>

                {/* Editorial Title */}
                <div className="relative">
                  <div className="absolute -top-6 -right-2 text-[#D98270]/70 select-none pointer-events-none hidden sm:block">
                    <span className="text-2xl">✦</span>
                    <span className="text-xs absolute -bottom-1 -right-3">✧</span>
                  </div>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] lg:leading-[64px] font-semibold tracking-tight text-[#1E2E2B]">
                    Every Celebration Begins With a Little{' '}
                    <span className="italic font-serif text-[#006857] underline decoration-[#E8B4A6]/60 decoration-wavy underline-offset-8">
                      Inspiration.
                    </span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                  From weddings and birthdays to festivals and college events, discover everything you need to plan your
                  perfect celebration — wrapped in soft, floaty editorial serenity.
                </p>

                {/* Hero CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Start Planning
                    <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                  </button>
                  <a
                    href="#businesses"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-on-surface border border-[#EADBCE] font-semibold text-sm shadow-xs hover:bg-[#FAF4EE] transition-all"
                  >
                    Explore Artisans
                  </a>
                </div>

                {/* Proof & Metrics */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#EFE1D4] px-4 py-2 rounded-full shadow-xs">
                    <div className="flex flex-col gap-1 pr-1">
                      <span className="w-2 h-2 rounded-full bg-[#E59A88]" />
                      <span className="w-2 h-2 rounded-full bg-[#7FBDAF]" />
                      <span className="w-2 h-2 rounded-full bg-[#E3C39D]" />
                    </div>
                    <p className="text-xs text-[#4E5C58]">
                      <span className="font-semibold text-on-surface">12,000+ vetted artisans</span> across 45+
                      creative hubs
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D98270] select-none">
                    <span className="text-base">✦</span>
                    <span className="text-xs">✦</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Layered Editorial Visual Montage */}
              <div className="lg:col-span-6 relative h-[520px] sm:h-[560px] w-full flex items-center justify-center">
                {/* Decorative Organic Arch Base */}
                <div className="absolute w-72 h-[380px] bg-[#FCE8DF] rounded-t-[100px] rounded-b-[40px] transform -translate-x-6 translate-y-4 opacity-90 pointer-events-none" />

                {/* Central Arched Showcase Card */}
                <div className="absolute z-20 w-[280px] sm:w-[290px] h-[380px] sm:h-[390px] rounded-t-[110px] rounded-b-[36px] overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  {/* Overlaid Washi Tape Tag */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-[#FAF0E6]/90 backdrop-blur-sm border border-[#E8DACB] shadow-xs rotate-[-3deg] rounded-sm pointer-events-none flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#A88B7D] font-bold">
                      Dream Weddings & Receptions
                    </span>
                  </div>
                  <img
                    alt="Boutique wedding couple"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/images/wedding-hero.jpg"
                    loading="eager"
                  />
                  {/* Floating Bottom Details Card */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#F4EAE0] flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-[#223330] font-semibold">Dream Weddings • Outdoor & Traditional</p>
                      <p className="text-[11px] text-[#7D8E8A]">180 Guests • Full Coordination</p>
                    </div>
                    <button
                      onClick={() => setHeroFavorite(!heroFavorite)}
                      className="w-8 h-8 rounded-full bg-secondary-fixed text-primary flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      aria-label="Save to Wishlist"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${heroFavorite ? 'filled text-rose-600' : ''}`}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Arched Festive Nights Card */}
                <div className="absolute z-10 top-2 right-2 sm:right-4 w-[190px] sm:w-[210px] h-[240px] sm:h-[260px] rounded-t-[80px] rounded-b-[28px] overflow-hidden shadow-lg border-4 border-white bg-[#EBF6F2] rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute top-2 right-4 z-30 w-14 h-4 bg-[#FAF0E6]/90 border border-[#E8DACB] shadow-xs rotate-12 rounded-sm pointer-events-none" />
                  <img
                    alt="Indian Diwali festive celebration"
                    className="w-full h-full object-cover"
                    src="/images/diwali-hero.jpg"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#006857] shadow-xs">
                    Cultural Festivals ✦
                  </div>
                </div>

                {/* Left Bottom Birthday Bashes Card */}
                <div className="absolute z-30 -bottom-2 -left-2 w-[200px] sm:w-[220px] h-[190px] sm:h-[210px] rounded-t-[70px] rounded-b-[24px] overflow-hidden shadow-2xl border-4 border-white -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    alt="Friends gathered celebrating birthday"
                    className="w-full h-full object-cover"
                    src="/images/birthday-hero.jpg"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">cake</span> Birthday Bashes
                  </div>
                </div>

                {/* Floating Dots Cluster */}
                <div className="absolute -right-4 bottom-8 flex flex-col gap-2 z-30 hidden sm:flex">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-xs" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#7FBDAF] shadow-xs" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#E5C9A6] shadow-xs" />
                </div>

                {/* Verified Badge */}
                <div className="absolute top-12 left-0 z-40 bg-white/95 px-4 py-2 rounded-full border border-[#F0E2D6] shadow-lg flex items-center gap-2">
                  <span className="text-[#D98270]">✦</span>
                  <span className="text-xs font-semibold text-[#2C3B37]">Verified Local Vendors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Wave Divider Transition */}
          <div className="w-full overflow-hidden leading-none text-[#FFFDF9] mt-10">
            <svg className="relative block w-full h-14 lg:h-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path
                d="M0,0 C200,85 450,20 700,75 C950,130 1100,30 1200,60 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            2. INTRODUCTORY EDITORIAL SECTION ("The eVenue Difference")
        ───────────────────────────────────────────────────────────── */}
        <section id="about" className="w-full bg-[#FFFDF9] py-16 relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left: Framed Arch Editorial Photo */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="absolute -top-4 -left-4 text-[#D98270] select-none pointer-events-none">
                  <span className="text-3xl">✦</span>
                </div>
                <div className="relative w-full max-w-[380px] h-[480px] bg-[#FAF1E9] rounded-t-[140px] rounded-b-[36px] p-3 shadow-xl border-4 border-white">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-[#FAF0E6]/90 border border-[#E3D3C3] rotate-1 shadow-xs rounded-sm flex items-center justify-center">
                    <span className="text-[9px] tracking-widest text-[#9C7D70] font-bold uppercase">
                      Editorial Suite
                    </span>
                  </div>
                  <div className="w-full h-full rounded-t-[130px] rounded-b-[28px] overflow-hidden relative group">
                    <img
                      alt="Intimate celebration arrangement"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src="/images/editorial-suite.jpg"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F3330]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[#F9C3B5] text-xs">✦</span>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#F9C3B5]">
                          Atmosphere & Soul
                        </span>
                      </div>
                      <p className="font-serif text-xl font-medium">Unforgettable gatherings, effortless rhythm.</p>
                    </div>
                  </div>

                  {/* Accents */}
                  <div className="absolute -right-5 top-1/2 flex flex-col gap-2 z-20 hidden sm:flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E59A88]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#A3C9BE]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EAD5B9]" />
                  </div>
                </div>

                {/* Floating Guarantee Badge */}
                <div className="absolute -bottom-5 -right-2 sm:right-6 p-4 rounded-2xl bg-white border border-[#EFE3D7] shadow-xl z-20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#243531]">100% Curated</p>
                    <p className="text-[11px] text-[#7D8F8B]">Direct concierge guarantee</p>
                  </div>
                </div>
              </div>

              {/* Right: Copy & Feature Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF6F2] text-primary text-[11px] tracking-wider uppercase font-bold">
                    <span>✦</span> The eVenue Difference
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1F2F2C]">
                    Your Vision. Every Little Detail.{' '}
                    <br className="hidden sm:block" />
                    <span className="italic font-serif text-[#006857]">One Unified, Calming Sanctuary.</span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  Planning an event shouldn't mean juggling endless tabs and chaotic vendor quotes. eVenue wraps your
                  celebration in organic serenity, unifying checklists, curated stylists, and bespoke spaces.
                </p>

                {/* 3 Pillar Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-3xl bg-[#FAF4ED] border border-[#F2E5D9] hover:bg-[#F6EEE5] transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xs mb-3 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[22px]">checklist</span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#233430]">Bespoke Lists</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">
                      Tailored milestones automatically aligned with your unique style.
                    </p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#FAF4ED] border border-[#F2E5D9] hover:bg-[#F6EEE5] transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#006857] shadow-xs mb-3 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[22px]">local_florist</span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#233430]">Master Artisans</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">
                      Independent florists, private estates, and boutique patisseries.
                    </p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#FAF4ED] border border-[#F2E5D9] hover:bg-[#F6EEE5] transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#006857] shadow-xs mb-3 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[22px]">all_inclusive</span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#233430]">Zero Friction</h3>
                    <p className="text-xs text-outline mt-1 leading-relaxed">
                      Transparent quotes, verified terms, and direct concierge assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Wave Divider */}
          <div className="w-full overflow-hidden leading-none text-[#FBF6F0] mt-12">
            <svg className="relative block w-full h-12" preserveAspectRatio="none" viewBox="0 0 1200 120">
              <path
                d="M0,40 C300,100 600,0 900,80 C1050,110 1150,50 1200,40 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. EVENT CATEGORIES SECTION ("What Are You Celebrating?")
        ───────────────────────────────────────────────────────────── */}
        <section id="categories" className="w-full bg-[#FBF6F0] py-16 relative">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Curated Portfolios
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface">
                  What Are You Celebrating?
                </h2>
                <p className="text-base text-on-surface-variant">
                  Whatever the occasion, we'll help you figure out what you need.
                </p>
              </div>

              {/* Navigation Carousel Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCategoryPage((prev) => (prev > 0 ? prev - 1 : 1))}
                  className="w-10 h-10 rounded-full bg-white text-on-surface flex items-center justify-center shadow-xs hover:bg-primary hover:text-white transition-all cursor-pointer"
                  aria-label="Previous Category Page"
                >
                  <span className="material-symbols-outlined text-[20px]">west</span>
                </button>
                <button
                  onClick={() => setActiveCategoryPage((prev) => (prev < 1 ? prev + 1 : 0))}
                  className="w-10 h-10 rounded-full bg-white text-on-surface flex items-center justify-center shadow-xs hover:bg-primary hover:text-white transition-all cursor-pointer"
                  aria-label="Next Category Page"
                >
                  <span className="material-symbols-outlined text-[20px]">east</span>
                </button>
              </div>
            </div>

            {/* 8-Card Grid (4 visible per view or 8 responsive cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group relative rounded-3xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="h-56 w-full overflow-hidden relative">
                    <img
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={cat.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent" />
                    {cat.badge && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-on-surface text-[11px] font-bold">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between bg-white">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-outline">{cat.subtitle}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface-container-low group-hover:bg-primary group-hover:text-white flex items-center justify-center text-primary transition-all">
                      <span className="material-symbols-outlined text-[18px]">north_east</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Architecture Link */}
            <div className="pt-4 text-center">
              <a
                href="#register"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-container font-semibold transition-colors"
              >
                <span>Planning Something Different? Custom Event Architecture</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. HOW EVENUE WORKS ("From Planning to Party Time")
        ───────────────────────────────────────────────────────────── */}
        <section id="how-it-works" className="w-full bg-white py-16">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                Effortless Flow
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface">
                From Planning to Party Time.
              </h2>
              <p className="text-base text-on-surface-variant">
                Three straightforward steps to transform raw inspiration into unforgettable gathering moments.
              </p>
            </div>

            {/* 3 Steps Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative p-8 rounded-3xl bg-surface-container-low flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-primary font-bold">01</span>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">tune</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-on-surface">Choose Your Event</h3>
                    <p className="text-sm text-outline leading-relaxed">
                      Tell us what you're planning, your chosen destination or city, target guest count, and your celebration date window.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 flex items-center gap-2 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Takes less than 90 seconds
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-8 rounded-3xl bg-surface-container-low flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-primary font-bold">02</span>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-on-surface">Discover Your Checklist</h3>
                    <p className="text-sm text-outline leading-relaxed">
                      Unlock an automated, bespoke list of services, legal permits, dietary provisions, and milestones calibrated specifically for your scale.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 flex items-center gap-2 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Dynamic budget estimator included
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-8 rounded-3xl bg-surface-container-low flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-primary font-bold">03</span>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">handshake</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-on-surface">Find Your Vendors</h3>
                    <p className="text-sm text-outline leading-relaxed">
                      Connect directly with vetted local caterers, botanical florists, photographers, and audio designers with zero markup fees.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 flex items-center gap-2 text-primary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Instant direct messaging & escrow
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. EVENT ESSENTIALS & SERVICES ("Every Component Covered")
        ───────────────────────────────────────────────────────────── */}
        <section className="w-full bg-surface-container py-16">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                Every Component Covered
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface">
                All the Little Things That Make It Special.
              </h2>
              <p className="text-base text-on-surface-variant">
                Tap into specialized artisans matching every single line item of your celebration.
              </p>
            </div>

            {/* 10 Curated Grid Elements */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {essentials.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-on-surface">{item.name}</h4>
                  <span className="text-xs font-semibold text-primary mt-1">{item.price}</span>
                  <span className="text-[11px] text-outline mt-0.5">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. DISCOVER LOCAL BUSINESSES & CONCIERGE SEARCH
        ───────────────────────────────────────────────────────────── */}
      
        {/* ─────────────────────────────────────────────────────────────
            7. VENDOR REGISTRATION SECTION ("Artisan Community")
        ───────────────────────────────────────────────────────────── */}
        <section id="register" className="w-full py-16 relative overflow-hidden bg-[#FBF6F0]">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
            <div className="rounded-3xl bg-surface-container-low p-8 lg:p-16 relative overflow-hidden shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left: Story & Value Props */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Artisan Community
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-on-surface leading-tight">
                    Make Your Business Part of <br className="hidden sm:block" />
                    <span className="italic font-serif text-primary">Someone's Big Day.</span>
                  </h2>
                  <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
                    Showcase your talents directly to discerning couples, families, and organizers looking for quality
                    over quantity. Keep 100% of your initial deposits with our transparent platform.
                  </p>

                  {/* 3 Value Props */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-on-surface">
                          Showcase your portfolio with high fidelity
                        </h4>
                        <p className="text-xs text-outline">
                          Editorial magazine style gallery layouts that let your craftsmanship shine.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-on-surface">
                          Add customized packages & transparent pricing
                        </h4>
                        <p className="text-xs text-outline">
                          Give clients upfront clarity and minimize endless back-and-forth email loops.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-on-surface">
                          Connect with high-intent event hosts in your city
                        </h4>
                        <p className="text-xs text-outline">
                          Receive matched leads with verified budgets and confirmed milestone dates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white text-sm font-semibold shadow-md hover:bg-primary-container transition-all"
                    >
                      <span>Register Your Business</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                  </div>
                </div>

                {/* Right: Visual Portrait Card */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-white p-3 shadow-xl">
                    <div className="h-96 rounded-2xl overflow-hidden relative group">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt="Artisan florist Elena Vance"
                        src="/images/artisan-elena.jpg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-serif text-lg">"eVenue connected us with our dream clients."</p>
                        <p className="text-xs text-primary-fixed pt-1 font-medium">
                          Elena Vance • Floral Designer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating verification counter */}
                  <div className="absolute -bottom-4 -left-2 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-[#F0E2D6]">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-sm">
                      4.5k
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Trusted Partners</p>
                      <p className="text-[11px] text-outline">Across 45+ cities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. CLOSING CTA BANNER ("Your Next Celebration")
        ───────────────────────────────────────────────────────────── */}
        <section className="w-full bg-white py-24 relative overflow-hidden">
          {/* Decorative Sparkles */}
          <div className="absolute top-10 left-1/4 text-primary/15 pointer-events-none">
            <span className="material-symbols-outlined text-[48px]">auto_awesome</span>
          </div>
          <div className="absolute bottom-10 right-1/4 text-primary/15 pointer-events-none">
            <span className="material-symbols-outlined text-[36px]">auto_awesome</span>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low text-primary text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary" /> Curated Celebrations
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-on-surface leading-tight">
              Your Next Celebration <br />
              <span className="italic font-serif text-primary">Starts Right Here.</span>
            </h2>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Find inspiration, organize the essentials, and discover the right artisans to bring your event vividly to
              life.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-container transition-all cursor-pointer"
              >
                <span>Start Planning Now</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">celebration</span>
              </button>
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-surface-container-low text-on-surface text-sm font-semibold shadow-xs hover:bg-surface-container transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2 text-[20px] text-primary">support_agent</span>
                <span>Chat with a Celebration Concierge</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-inverse-surface text-inverse-on-surface pt-16 pb-12">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Brand Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed-dim flex items-center justify-center">
                  <span className="text-on-primary-fixed font-serif text-xl leading-none pb-0.5 font-bold">
                    e
                  </span>
                </div>
                <span className="font-serif text-2xl text-surface-bright tracking-tight font-medium">
                  evenue
                </span>
              </div>
              <p className="text-sm text-outline-variant max-w-sm leading-relaxed">
                The premier event planning and artisanal vendor curation platform. Discover boutique estates, master
                florists, culinary artists, and bespoke party services.
              </p>
            </div>

            {/* Platform Col */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-surface-bright uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-outline-variant">
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#home">
                    Home Overview
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#categories">
                    Event Categories
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#businesses">
                    Explore Venues
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#about">
                    About eVenue
                  </a>
                </li>
                <li>
                  <button className="hover:text-surface-bright transition-colors text-left cursor-pointer">
                    Curated Concierge
                  </button>
                </li>
              </ul>
            </div>

            {/* Artisans & Venues Col */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-surface-bright uppercase tracking-wider">
                For Artisans & Venues
              </h4>
              <ul className="space-y-2 text-xs text-outline-variant">
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#register">
                    List Your Space
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#register">
                    Vendor Portal
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#about">
                    Editorial Standards
                  </a>
                </li>
                <li>
                  <a className="hover:text-surface-bright transition-colors" href="#register">
                    Partner Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-outline-variant text-xs">
            <div>© {new Date().getFullYear()} eVenue Platform Inc. All rights reserved. Crafted for boutique celebrations.</div>
            <div className="flex items-center gap-6">
              <a className="hover:text-surface-bright transition-colors" href="#privacy">
                Privacy Policy
              </a>
              <a className="hover:text-surface-bright transition-colors" href="#terms">
                Terms of Service
              </a>
              <a className="hover:text-surface-bright transition-colors" href="#safety">
                Trust & Safety
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
