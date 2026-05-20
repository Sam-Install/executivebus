import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiShield, FiNavigation, FiHeadphones, FiStar,
  FiTag, FiPackage, FiArrowRight,
} from 'react-icons/fi'
import h1 from '../assets/hero1.jpg'
import h2 from '../assets/hero2.jpeg'

const buses = [
  { id: 1, from: 'Nairobi', to: 'Mombasa', departs: '07:00 AM', arrives: '01:00 PM', seats: 12, price: 'KES 1,200' },
  { id: 2, from: 'Mombasa', to: 'Nairobi', departs: '08:30 AM', arrives: '02:30 PM', seats: 5,  price: 'KES 1,200' },
  { id: 3, from: 'Nairobi', to: 'Kisumu',  departs: '06:00 AM', arrives: '12:00 PM', seats: 20, price: 'KES 950'  },
  { id: 4, from: 'Kisumu',  to: 'Nairobi', departs: '09:00 AM', arrives: '03:00 PM', seats: 8,  price: 'KES 950'  },
  { id: 5, from: 'Nairobi', to: 'Nakuru',  departs: '10:00 AM', arrives: '12:30 PM', seats: 18, price: 'KES 600'  },
]

const features = [
  { icon: <FiShield size={26} />,     label: 'Secure Payments',    desc: 'End-to-end encrypted transactions' },
  { icon: <FiNavigation size={26} />, label: 'Reliable Travelling', desc: 'On-time departures, every route'  },
  { icon: <FiHeadphones size={26} />, label: '24/7 Support',        desc: 'Always here when you need us'     },
  { icon: <FiStar size={26} />,       label: 'Comfort',             desc: 'Premium seats & smooth journeys'  },
]

// ── Shared variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = (delay = 0, staggerChildren = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren: delay } },
})

export default function Hero() {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo]     = useState('')

  const cities   = [...new Set(buses.flatMap(b => [b.from, b.to]))]
  const filtered = buses.filter(b => (!from || b.from === from) && (!to || b.to === to))

  const goToSeats = (bus, e) => {
    if (e) e.stopPropagation()
    navigate('/buses/seats', { state: { bus } })
  }

  return (
    <div className="bg-[#f7f8fa]" style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh' }}>
        <div className="relative flex-1 grid grid-cols-2 overflow-hidden" style={{ minHeight: '100vh' }}>

          {/* Left image */}
          <motion.div
            className="relative overflow-hidden"
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            <img src={h1} alt="Bus travel" className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.44)', transform: 'scale(1.04)' }} />
          </motion.div>

          {/* Right image */}
          <motion.div
            className="relative overflow-hidden"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
          >
            <img src={h2} alt="Journey" className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.34)', transform: 'scale(1.04)' }} />
          </motion.div>

          {/* Gold centre divider line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] z-[2] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #f5a623 30%, #f5a623 70%, transparent 100%)', opacity: 0.85 }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />

          {/* OVERLAY content */}
          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center"
            style={{ padding: '8rem clamp(1rem, 8vw, 6rem) 4rem' }}>

            <motion.h1
              className="text-white font-extrabold leading-[1.1] tracking-tight max-w-3xl"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              Travel Smarter,<br />
              <span style={{ color: '#f5a623' }}>Arrive Happier</span>
            </motion.h1>

            <motion.h2
              className="font-normal tracking-wide"
              style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', marginBottom: '1.2rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
            >
              Book seats, track parcels &amp; ride in comfort
            </motion.h2>

            {/* Route pills */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 mb-8"
              variants={stagger(0.7, 0.08)}
              initial="hidden"
              animate="show"
            >
              {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'].map((city, i, arr) => (
                <React.Fragment key={city}>
                  <motion.span
                    variants={fadeUp}
                    className="text-sm font-semibold tracking-wide px-3 py-1 rounded-full"
                    style={{ background: 'rgba(245,166,35,0.18)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.35)' }}
                  >
                    {city}
                  </motion.span>
                  {i < arr.length - 1 && (
                    <motion.span variants={fadeUp} style={{ color: 'rgba(245,166,35,0.5)', fontSize: '0.75rem' }}>›</motion.span>
                  )}
                </React.Fragment>
              ))}
              <motion.span
                variants={fadeUp}
                className="text-sm font-semibold tracking-wide px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                &amp; beyond
              </motion.span>
            </motion.div>

            <motion.p
              className="text-[0.9rem] leading-[1.85] max-w-[460px]"
              style={{ color: 'rgba(255,255,255,0.52)', marginBottom: '3rem' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
            >
              From last-minute seats to sending packages across the country —
              we've got you covered, 24 hours a day, 7 days a week.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.18 }}
            >
              <motion.button
                onClick={() => navigate('/booking')}
                className="flex items-center gap-2.5 rounded-full font-bold"
                style={{ background: '#f5a623', color: '#1a1200', border: 'none', padding: '1rem 2.25rem', fontSize: '0.95rem', boxShadow: '0 6px 28px rgba(245,166,35,0.45)', cursor: 'pointer' }}
                whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(245,166,35,0.55)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <FiTag size={18} /> Book Tickets
              </motion.button>

              <motion.button
                onClick={() => navigate('/track')}
                className="flex items-center gap-2.5 rounded-full font-semibold text-white"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.45)', padding: '1rem 2.25rem', fontSize: '0.95rem', backdropFilter: 'blur(10px)', cursor: 'pointer' }}
                whileHover={{ y: -3, background: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <FiPackage size={18} /> Track Parcel
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-[-2px] left-0 right-0 z-[4] pointer-events-none">
            <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f7f8fa" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-20 pb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={stagger(0, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map(({ icon, label, desc }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: '0 14px 36px rgba(0,0,0,0.08)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white border border-[#eaeaea] rounded-2xl p-7 flex flex-col items-start gap-4 shadow-sm cursor-default"
          >
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(245,166,35,0.12)', color: '#d48b10' }}
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {icon}
            </motion.div>
            <div>
              <p className="m-0 font-bold text-[0.97rem] text-[#111]">{label}</p>
              <p className="mt-1 text-[0.83rem] text-[#777] leading-[1.55] m-0">{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── BUS SEARCH TABLE ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-2 pb-28">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[1.5rem] font-bold text-[#111] mb-1">Search Available Buses</h2>
          <p className="text-[#888] text-[0.9rem] mt-1 mb-7">Filter by route then click a row to pick your seats</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#ddd] bg-white text-[0.9rem] cursor-pointer min-w-[160px] focus:outline-none focus:border-[#f5a623] transition-colors">
            <option value="">From — All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={to} onChange={e => setTo(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#ddd] bg-white text-[0.9rem] cursor-pointer min-w-[160px] focus:outline-none focus:border-[#f5a623] transition-colors">
            <option value="">To — All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {(from || to) && (
            <motion.button
              onClick={() => { setFrom(''); setTo('') }}
              className="px-5 py-2.5 rounded-xl border border-[#ddd] bg-white text-[0.9rem] text-[#888] cursor-pointer hover:bg-[#f5f5f5] transition-colors duration-150"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              Clear
            </motion.button>
          )}
        </motion.div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto rounded-2xl border border-[#eaeaea] bg-white shadow-sm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <table className="w-full border-collapse text-[0.92rem]">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#eee]">
                {['From', 'To', 'Departs', 'Arrives', 'Seats', 'Price', ''].map(h => (
                  <th key={h} className="px-5 py-4 text-left font-semibold text-[#555] text-[0.78rem] tracking-[0.06em] uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-14 text-center text-[#aaa]">No buses found for this route</td></tr>
              ) : filtered.map((bus, i) => (
                <motion.tr
                  key={bus.id}
                  onClick={e => goToSeats(bus, e)}
                  className="cursor-pointer"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ backgroundColor: '#fffbf0' }}
                >
                  <td className="px-5 py-4 font-semibold text-[#111] whitespace-nowrap">{bus.from}</td>
                  <td className="px-5 py-4 text-[#333] whitespace-nowrap">{bus.to}</td>
                  <td className="px-5 py-4 text-[#333] whitespace-nowrap">{bus.departs}</td>
                  <td className="px-5 py-4 text-[#333] whitespace-nowrap">{bus.arrives}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-[0.78rem] font-semibold whitespace-nowrap"
                      style={{ background: bus.seats <= 5 ? '#fff0f0' : '#f0faf3', color: bus.seats <= 5 ? '#c0392b' : '#1a7a40' }}>
                      {bus.seats} left
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold whitespace-nowrap" style={{ color: '#d48b10' }}>{bus.price}</td>
                  <td className="px-5 py-4">
                    <motion.button
                      onClick={e => goToSeats(bus, e)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.83rem] font-semibold cursor-pointer whitespace-nowrap"
                      style={{ background: '#f5a623', color: '#1a1200', border: 'none' }}
                      whileHover={{ opacity: 0.85 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      Select <FiArrowRight size={14} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-3 text-[0.78rem] text-[#bbb] text-right">Click any row or "Select" to choose your seats</p>
      </section>
    </div>
  )
}