import React from 'react'
import { FaBusAlt, FaRoute, FaShieldAlt, FaClock } from 'react-icons/fa'
import { MdWifi, MdElectricalServices, MdTv, MdSupportAgent, MdVerified, MdAirlineSeatReclineExtra } from 'react-icons/md'
import { HiCheckCircle } from 'react-icons/hi'

const features = [
  { icon: <FaRoute size={20} />, text: 'Search for available routes across the East African region.' },
  { icon: <FaBusAlt size={20} />, text: 'Select your preferred luxury bus from our modern fleet.' },
  { icon: <MdAirlineSeatReclineExtra size={20} />, text: 'Enjoy premium amenities like WiFi, AC, and reclining seats.' },
  { icon: <FaShieldAlt size={20} />, text: 'Travel safely and affordably to your destination.' },
]

const amenities = [
  { icon: <MdWifi size={22} />, label: 'Free WiFi' },
  { icon: <MdElectricalServices size={22} />, label: 'Charging Outlets' },
  { icon: <MdTv size={22} />, label: 'Flat-screen TVs' },
  { icon: <MdSupportAgent size={22} />, label: '24/7 Support' },
  { icon: <MdVerified size={22} />, label: 'Verified Fleet' },
  { icon: <FaClock size={20} />, label: 'Punctual Service' },
]

const About = () => {
  return (
    <section className='pt-28 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#f7f8fa] min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-8 sm:p-10'>

          {/* Title */}
          <h1 className='text-3xl font-bold text-[#111] mb-6'>About ExecutiveBus</h1>

          {/* Intro */}
          <p className='text-[#555] text-sm leading-relaxed mb-4'>
            <span className='font-bold text-[#111]'>ExecutiveBus Transporters</span> is your premier bus company covering top cities across Kenya, Uganda, and Tanzania. With a decade of experience and a fleet of over 50 luxurious buses, we provide a 5-star travel experience defined by professionalism, safety, and punctuality.
          </p>

          <p className='text-[#555] text-sm leading-relaxed mb-6'>
            <span className='font-bold text-[#111]'>ExecutiveBus Transporters</span> is seamless — from booking to boarding, everything is designed around your comfort.
          </p>

          {/* Feature List */}
          <ul className='space-y-3 mb-8'>
            {features.map((f, i) => (
              <li key={i} className='flex items-start gap-3'>
                <span className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5'
                  style={{ background: 'rgba(245,166,35,0.12)', color: '#d48b10' }}>
                  {f.icon}
                </span>
                <span className='text-sm text-[#555] pt-1'>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Amenities Grid */}
          <div className='bg-[#f7f8fa] rounded-xl p-6 mb-8'>
            <p className='text-xs font-semibold text-[#999] uppercase tracking-widest mb-4'>On-board Amenities</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
              {amenities.map((a, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <span className='w-9 h-9 rounded-xl flex items-center justify-center shrink-0'
                    style={{ background: 'rgba(245,166,35,0.12)', color: '#d48b10' }}>
                    {a.icon}
                  </span>
                  <span className='text-sm text-[#333] font-medium'>{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className='border-t border-[#eee] pt-6'>
            <p className='text-sm font-bold text-[#111] uppercase tracking-wide mb-2'>
              Need a safe, comfortable, and affordable bus transport service?
            </p>
            <div className='flex items-center gap-2'>
              <HiCheckCircle size={18} style={{ color: '#f5a623' }} className='shrink-0' />
              <p className='text-sm text-[#555]'>Then ExecutiveBus Transporters is the provider for you.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About