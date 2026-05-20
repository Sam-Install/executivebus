import React from 'react'
import { motion } from 'framer-motion'
import {
  FiShield,
  FiClock,
  FiSmile,
  FiMapPin,
  FiStar,
  FiHeadphones,
  FiZap,
  FiUsers,
} from 'react-icons/fi'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'

const stats = [
  { value: '50K+', label: 'Happy Passengers' },
  { value: '98%',  label: 'On-Time Rate'      },
  { value: '15+',  label: 'Routes Covered'    },
  { value: '24/7', label: 'Support Available' },
]

const reasons = [
  {
    icon: <MdAirlineSeatReclineExtra size={24} />,
    title: 'Premium Recliner Seats',
    desc: 'Sink into wide, cushioned recliners with extra legroom. Every seat is designed for long-distance comfort — not just surviving the journey.',
    accent: '#f5a623',
  },
  {
    icon: <FiClock size={22} />,
    title: 'Guaranteed On-Time Departure',
    desc: "We don't do Kenyan time. When your ticket says 7:00 AM, the bus leaves at 7:00 AM. Your schedule matters to us.",
    accent: '#3b82f6',
  },
  {
    icon: <FiShield size={22} />,
    title: 'Safety First, Always',
    desc: 'Professionally trained drivers, regular vehicle inspections, and real-time GPS tracking on every route. You are in good hands.',
    accent: '#10b981',
  },
  {
    icon: <FiZap size={22} />,
    title: 'Fast & Easy Booking',
    desc: 'Book your seat in under 2 minutes — pick your route, choose your seat, pay securely. No queues, no phone calls, no hassle.',
    accent: '#f5a623',
  },
  {
    icon: <FiMapPin size={22} />,
    title: 'Door-to-Door Parcel Delivery',
    desc: 'Send packages to any destination we serve. Track your parcel in real time and get delivery notifications at every stage.',
    accent: '#8b5cf6',
  },
  {
    icon: <FiHeadphones size={22} />,
    title: '24/7 Customer Support',
    desc: 'Have a question at midnight? Our team is always available — call, WhatsApp, or chat. We sort it out, fast.',
    accent: '#ec4899',
  },
]

// ── Shared variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
})

export default function WhyUs() {
  return (
    <section
      className="pt-20 px-4 sm:px-8 md:px-12 lg:px-16 pb-24 bg-[#f7f8fa]"
      style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ──────────────────────────────────────── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left copy */}
          <motion.div className="max-w-xl" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 32, height: 3, borderRadius: 2, background: '#f5a623' }} />
              <span className="text-[0.75rem] font-bold tracking-[0.2em] uppercase text-[#f5a623]">
                Why Executive Bus
              </span>
            </div>

            <h2
              className="font-extrabold text-[#111] leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              The smarter way<br />
              <span style={{ color: '#f5a623' }}>to travel Kenya</span>
            </h2>

            <p className="text-[#666] text-[1rem] leading-[1.8] max-w-md">
              Thousands of Kenyans choose Executive Bus every day — not because
              they have to, but because once you travel with us, everything else
              feels like a downgrade.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:shrink-0"
            variants={staggerContainer(0.08, 0.15)}
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm
                           flex flex-col items-center justify-center text-center px-5 py-5"
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="font-extrabold text-[1.8rem] leading-none mb-1" style={{ color: '#f5a623' }}>
                  {value}
                </span>
                <span className="text-[0.75rem] text-[#888] font-medium leading-tight">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── REASONS GRID ────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map(({ icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.09)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-7 flex flex-col gap-4 cursor-default"
            >
              {/* Icon bubble */}
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center self-start"
                style={{ background: `${accent}18`, color: accent }}
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {icon}
              </motion.div>

              {/* Number watermark + title */}
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-[1rem] text-[#111] leading-snug m-0 max-w-[80%]">
                  {title}
                </h3>
                <span
                  className="text-[2rem] font-extrabold leading-none select-none"
                  style={{ color: '#f0f0f0' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="text-[0.86rem] text-[#666] leading-[1.75] m-0">{desc}</p>

              {/* Bottom accent line — no "Learn more" */}
              <div
                className="mt-auto pt-4"
                style={{ borderTop: `2px solid ${accent}22` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── BOTTOM CTA STRIP ────────────────────────────── */}
        <motion.div
          className="mt-14 rounded-3xl flex flex-col sm:flex-row items-center
                     justify-between gap-6 px-8 sm:px-12 py-10"
          style={{
            background: 'linear-gradient(135deg, #1a1200 0%, #2d1f00 100%)',
            border: '1px solid rgba(245,166,35,0.2)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 400 }}
                >
                  <FiStar size={14} style={{ color: '#f5a623' }} />
                </motion.span>
              ))}
              <span className="text-[0.75rem] text-[#888] ml-1">4.9 / 5 from 3,200+ reviews</span>
            </div>
            <h3 className="text-white font-bold text-[1.3rem] m-0 leading-tight">
              Ready to travel the Executive way?
            </h3>
            <p className="text-[#888] text-[0.85rem] mt-1 m-0">
              Join over 50,000 passengers who made the switch.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              {['#f5a623', '#3b82f6', '#10b981', '#8b5cf6'].map((c, i) => (
                <motion.div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#1a1200] flex items-center justify-center"
                  style={{ background: c }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <FiUsers size={13} color="#fff" />
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-[0.85rem] m-0">50K+ riders</p>
              <p className="text-[#666] text-[0.72rem] m-0">and growing daily</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}