import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDirectionsBus, MdMenu, MdClose } from 'react-icons/md'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact Us', to: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${scrolled ? 'bg-[#0a0a0a] shadow-lg border-[#f5a62330]' : 'bg-[#0a0a0a]/80 border-[#f5a62315]'}`}>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>

          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <MdDirectionsBus size={24} style={{ color: '#f5a623' }} />
            <div>
              <span className='font-bold text-lg tracking-tight leading-none text-white'>
                Executive<span style={{ color: '#f5a623' }}>Bus</span>
              </span>
              <span className='block text-xs tracking-widest uppercase leading-none mt-0.5' style={{ color: '#f5a62380' }}>
                Premium Transport
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map(link => (
              <Link key={link.label} to={link.to}
                className='text-sm font-medium uppercase tracking-wider transition-colors duration-200 text-[#b8b0a0] hover:text-white'>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className='hidden md:flex items-center gap-3'>
            <Link to='/signin'
              className='text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200'
              style={{ color: '#f5a623', borderColor: 'rgba(245,166,35,0.4)', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(245,166,35,0.1)'; e.currentTarget.style.borderColor='#f5a623' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(245,166,35,0.4)' }}>
              Sign In
            </Link>
            <Link to='/create'
              className='text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5'
              style={{ background: '#f5a623', color: '#1a1200', boxShadow: '0 4px 14px rgba(245,166,35,0.35)' }}>
              Create Account
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className='md:hidden transition-colors duration-200 text-[#f5a623] p-1'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            {menuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer — white background, slides down from top */}
      <div
        className={`fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#ffffff' }}
      >
        {/* Inner scroll container with top padding to clear the navbar (h-16 = 64px) */}
        <div
          className={`flex flex-col h-full pt-20 px-6 pb-10 transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {/* Nav links */}
          <div className='flex flex-col gap-1 mb-8'>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className='flex items-center justify-between py-4 border-b border-gray-100 text-xl font-semibold text-gray-800 hover:text-[#d48b10] transition-colors duration-200 group'
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
              >
                {link.label}
                <span className='text-gray-300 group-hover:text-[#f5a623] transition-colors duration-200 text-sm'>→</span>
              </Link>
            ))}
          </div>

          {/* Divider with label */}
          <div className='flex items-center gap-3 mb-8'>
            <div className='flex-1 h-px bg-gray-100' />
            <span className='text-[10px] font-semibold tracking-widest uppercase text-gray-300'>Account</span>
            <div className='flex-1 h-px bg-gray-100' />
          </div>

          {/* Auth buttons */}
          <div className='flex flex-col gap-3'>
            <Link
              to='/signin'
              onClick={() => setMenuOpen(false)}
              className='w-full text-center text-sm font-semibold py-4 rounded-xl border-2 transition-all duration-200 active:scale-95'
              style={{ color: '#d48b10', borderColor: 'rgba(245,166,35,0.5)', background: '#fffbf0' }}
            >
              Sign In
            </Link>
            <Link
              to='/create'
              onClick={() => setMenuOpen(false)}
              className='w-full text-center text-sm font-bold py-4 rounded-xl transition-all duration-200 active:scale-95'
              style={{
                background: '#f5a623',
                color: '#1a1200',
                boxShadow: '0 4px 18px rgba(245,166,35,0.35)',
              }}
            >
              Create Account
            </Link>
          </div>

          {/* Footer branding */}
          <div className='mt-auto pt-8 flex items-center gap-2 opacity-40'>
            <MdDirectionsBus size={18} style={{ color: '#f5a623' }} />
            <span className='text-xs font-bold tracking-tight text-gray-500'>
              Executive<span style={{ color: '#d48b10' }}>Bus</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar