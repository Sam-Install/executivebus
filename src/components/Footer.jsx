import React from 'react'
import { MdDirectionsBus, MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className='bg-[#0a0a0a] text-[#888] pt-16 pb-6 px-4 sm:px-8 md:px-12 lg:px-16 mt-20'>

      {/* Top Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>

        {/* Brand */}
        <div>
          <div className='flex items-center gap-2 mb-4'>
            <MdDirectionsBus size={24} style={{ color: '#f5a623' }} />
            <span className='text-white text-xl font-bold tracking-tight'>
              Executive<span style={{ color: '#f5a623' }}>Bus</span>
            </span>
          </div>
          <p className='text-sm leading-relaxed'>
            Your trusted platform for seamless bus bookings, seat selection, and parcel tracking — all in one place.
          </p>
          {/* Socials */}
          <div className='flex items-center gap-3 mt-6'>
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href='#'
                className='w-8 h-8 rounded-full border border-[#222] flex items-center justify-center transition-all duration-200'
                style={{ color: '#888' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#f5a623'; e.currentTarget.style.color='#f5a623' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.color='#888' }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className='text-white text-sm font-semibold uppercase tracking-widest mb-5'>Quick Links</h4>
          <ul className='space-y-3'>
            {[
              { label: 'Sign Up', to: '/create' },
              { label: 'Login', to: '/signin' },
              { label: 'Track Parcel', to: '/track' },
              { label: 'View Seats', to: '/buses/seats' },
              { label: 'My Bookings', to: '/signin' },
            ].map((link, i) => (
              <li key={i}>
                <a href={link.to}
                  className='flex items-center gap-2 text-sm transition-colors duration-200 group'
                  style={{ color: '#888' }}
                  onMouseEnter={e => e.currentTarget.style.color='#f5a623'}
                  onMouseLeave={e => e.currentTarget.style.color='#888'}
                >
                  <HiArrowRight size={13} style={{ color: '#d48b10' }}
                    className='group-hover:translate-x-1 transition-transform duration-200' />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className='text-white text-sm font-semibold uppercase tracking-widest mb-5'>Services</h4>
          <ul className='space-y-3'>
            {['Bus Booking', 'Seat Selection', 'Parcel Tracking', 'Online Check-in', 'Travel Insurance'].map((item, i) => (
              <li key={i}>
                <a href='#'
                  className='flex items-center gap-2 text-sm transition-colors duration-200 group'
                  style={{ color: '#888' }}
                  onMouseEnter={e => e.currentTarget.style.color='#f5a623'}
                  onMouseLeave={e => e.currentTarget.style.color='#888'}
                >
                  <HiArrowRight size={13} style={{ color: '#d48b10' }}
                    className='group-hover:translate-x-1 transition-transform duration-200' />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className='text-white text-sm font-semibold uppercase tracking-widest mb-5'>Contact Us</h4>
          <ul className='space-y-4'>
            <li className='flex items-start gap-3 text-sm'>
              <MdLocationOn size={18} style={{ color: '#f5a623' }} className='mt-0.5 shrink-0' />
              <span>Moi Avenue, Nairobi, Kenya</span>
            </li>
            <li className='flex items-center gap-3 text-sm'>
              <MdPhone size={16} style={{ color: '#f5a623' }} className='shrink-0' />
              <a href='tel:+254700000000' className='transition-colors duration-200'
                onMouseEnter={e => e.target.style.color='#f5a623'} onMouseLeave={e => e.target.style.color=''}>
                +254 700 000 000
              </a>
            </li>
            <li className='flex items-center gap-3 text-sm'>
              <MdEmail size={16} style={{ color: '#f5a623' }} className='shrink-0' />
              <a href='mailto:support@executivebus.co.ke' className='transition-colors duration-200'
                onMouseEnter={e => e.target.style.color='#f5a623'} onMouseLeave={e => e.target.style.color=''}>
                support@executivebus.co.ke
              </a>
            </li>
          </ul>

          {/* Newsletter */}
          <div className='mt-6'>
            <p className='text-xs text-[#555] mb-2'>Subscribe for travel deals</p>
            <div className='flex'>
              <input type='email' placeholder='Your email'
                className='flex-1 bg-[#111] text-sm text-[#ccc] px-3 py-2 rounded-l-lg outline-none border border-[#222] placeholder:text-[#444] transition-colors duration-200'
                onFocus={e => e.target.style.borderColor='#f5a623'}
                onBlur={e => e.target.style.borderColor=''}
              />
              <button
                className='text-[#1a1200] text-sm font-bold px-4 py-2 rounded-r-lg transition-colors duration-200'
                style={{ background: '#f5a623' }}
                onMouseEnter={e => e.currentTarget.style.background='#d48b10'}
                onMouseLeave={e => e.currentTarget.style.background='#f5a623'}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-xs text-[#444]'>© {new Date().getFullYear()} ExecutiveBus. All rights reserved.</p>
        <div className='flex items-center gap-4 text-xs text-[#444]'>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
            <a key={i} href='#' className='transition-colors duration-200'
              onMouseEnter={e => e.target.style.color='#f5a623'} onMouseLeave={e => e.target.style.color=''}>
              {item}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer