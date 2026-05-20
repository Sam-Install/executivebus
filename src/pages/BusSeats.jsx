import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft, FiUser, FiMapPin, FiClock,
  FiCheckCircle, FiAlertCircle, FiCalendar,
} from 'react-icons/fi'
import { MdAirlineSeatReclineNormal } from 'react-icons/md'

// Seat tiers
// Seats 1–8   → VIP      (2× base price)
// Seats 9–16  → Economy  (1× base price)
// Seats 17–40 → Standard (0.75× base price, cheaper)
const getTier = (seatNumber) => {
  if (seatNumber <= 8)  return 'vip'
  if (seatNumber <= 16) return 'economy'
  return 'standard'
}

const TIER_META = {
  vip:      { label: 'VIP',      multiplier: 2,    bg: '#fff9ed', border: '#f5a623', text: '#d48b10', tag: 'bg-[#fff9ed] text-[#d48b10] border-[#f5a623]' },
  economy:  { label: 'Economy',  multiplier: 1,    bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8', tag: 'bg-[#eff6ff] text-[#1d4ed8] border-[#3b82f6]' },
  standard: { label: 'Standard', multiplier: 0.75, bg: '#f0faf3', border: '#b7e4c7', text: '#1a7a40', tag: 'bg-[#f0faf3] text-[#1a7a40] border-[#b7e4c7]' },
}

const generateSeats = (availableCount) => {
  const total = 40
  const bookedCount = total - availableCount
  const bookedIndices = new Set()
  // Don't book VIP seats preferentially — spread randomly
  while (bookedIndices.size < bookedCount) {
    const idx = Math.floor(Math.random() * total)
    // Keep at least 2 VIP free
    if (idx < 8 && [...bookedIndices].filter(i => i < 8).length >= 6) continue
    bookedIndices.add(idx)
  }
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    label: `${Math.floor(i / 4) + 1}${['A', 'B', 'C', 'D'][i % 4]}`,
    status: bookedIndices.has(i) ? 'booked' : 'available',
    tier: getTier(i + 1),
  }))
}

export default function BusSeats() {
  const navigate = useNavigate()
  const location = useLocation()
  const bus      = location.state?.bus

  const [seats]    = useState(() => generateSeats(bus?.seats ?? 20))
  const [selected, setSelected] = useState([])

  if (!bus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f7f8fa]">
        <FiAlertCircle size={48} className="text-[#f5a623]" />
        <p className="text-[#555] text-lg font-medium">No bus selected.</p>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
          style={{ background: '#f5a623', color: '#1a1200' }}>
          <FiArrowLeft size={16} /> Back to Search
        </button>
      </div>
    )
  }

  const basePrice = parseInt(bus.price.replace(/\D/g, ''), 10)

  const seatPrice = (tier) => Math.round(basePrice * TIER_META[tier].multiplier)

  const totalPrice = selected.reduce((sum, s) => sum + seatPrice(s.tier), 0)

  const toggleSeat = (seat) => {
    if (seat.status === 'booked') return
    setSelected(prev =>
      prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    )
  }

  const handleBook = () => {
    if (selected.length === 0) return
    navigate('/booking/confirm', { state: { bus, seats: selected, total: totalPrice } })
  }

  const rows = []
  for (let i = 0; i < seats.length; i += 4) rows.push(seats.slice(i, i + 4))

  const SeatBtn = ({ seat }) => {
    const isSelected = !!selected.find(s => s.id === seat.id)
    const isBooked   = seat.status === 'booked'
    const tier       = TIER_META[seat.tier]

    const bg     = isBooked ? '#f5f5f5' : isSelected ? tier.bg      : tier.bg
    const border = isBooked ? '#ddd'    : isSelected ? tier.border  : tier.border + '99'
    const color  = isBooked ? '#ccc'    : tier.text

    return (
      <button
        onClick={() => toggleSeat(seat)}
        title={`${seat.label} · ${TIER_META[seat.tier].label} · KES ${seatPrice(seat.tier).toLocaleString()}`}
        disabled={isBooked}
        className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-150"
        style={{
          background:  bg,
          borderColor: border,
          color,
          cursor:    isBooked ? 'not-allowed' : 'pointer',
          transform: isSelected ? 'scale(1.12)' : 'scale(1)',
          boxShadow: isSelected ? `0 2px 10px ${tier.border}55` : 'none',
          opacity:   isBooked ? 0.5 : 1,
        }}
      >
        <MdAirlineSeatReclineNormal size={16} />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]" style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>

      {/* TOP BAR */}
      <div className="bg-white border-b border-[#eee] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#f5f5f5] transition-colors cursor-pointer border border-[#eee]">
            <FiArrowLeft size={20} className="text-[#333]" />
          </button>
          <div>
            <h1 className="text-[1.1rem] font-bold text-[#111] leading-tight m-0">{bus.from} → {bus.to}</h1>
            <p className="text-[0.8rem] text-[#888] m-0 mt-0.5">Choose your seats</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-32">

        {/* TRIP INFO */}
        <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-6 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: <FiMapPin size={12} />, label: 'Route',   value: `${bus.from} → ${bus.to}` },
            { icon: <FiClock size={12} />,  label: 'Departs', value: bus.departs },
            { icon: <FiCalendar size={12} />, label: 'Arrives', value: bus.arrives },
            { icon: <FiUser size={12} />,   label: 'Base Fare', value: bus.price, amber: true },
          ].map(({ icon, label, value, amber }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[0.72rem] text-[#aaa] uppercase tracking-widest font-semibold">{icon} {label}</span>
              <span className="text-[0.95rem] font-bold" style={{ color: amber ? '#d48b10' : '#111' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* TIER PRICING LEGEND */}
        <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-5 mb-8">
          <p className="text-[0.72rem] text-[#aaa] uppercase tracking-widest font-semibold mb-3">Seat Pricing</p>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(TIER_META).map(([key, t]) => (
              <div key={key} className="flex flex-col gap-1 p-3 rounded-xl border" style={{ background: t.bg, borderColor: t.border }}>
                <div className="flex items-center gap-2">
                  <MdAirlineSeatReclineNormal size={16} style={{ color: t.text }} />
                  <span className="text-[0.82rem] font-bold" style={{ color: t.text }}>{t.label}</span>
                </div>
                <span className="text-[0.78rem] text-[#555]">
                  {key === 'vip' ? 'Rows 1–2 · Front' : key === 'economy' ? 'Rows 3–4 · Mid-front' : 'Rows 5–10 · Rear'}
                </span>
                <span className="text-[0.9rem] font-extrabold mt-1" style={{ color: t.text }}>
                  KES {seatPrice(key).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* SEAT MAP */}
          <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-6 sm:p-8">

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {[
                { label: 'Available', bg: '#f0faf3', border: '#b7e4c7', color: '#1a7a40' },
                { label: 'Selected',  bg: '#fff9ed', border: '#f5a623', color: '#d48b10' },
                { label: 'Booked',    bg: '#f5f5f5', border: '#ddd',    color: '#ccc'    },
              ].map(({ label, bg, border, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg border flex items-center justify-center"
                    style={{ background: bg, borderColor: border }}>
                    <MdAirlineSeatReclineNormal size={14} style={{ color }} />
                  </div>
                  <span className="text-[0.8rem] text-[#666]">{label}</span>
                </div>
              ))}
            </div>

            {/* Bus front */}
            <div className="flex flex-col items-center mb-5">
              <div className="w-full max-w-[320px] h-10 rounded-t-[40px] border-2 flex items-center justify-center"
                style={{ borderColor: '#eee', background: '#fafafa' }}>
                <span className="text-[0.72rem] text-[#bbb] tracking-widest uppercase font-semibold">🚌 Driver — Front</span>
              </div>
            </div>

            {/* Column labels */}
            <div className="flex justify-center mb-3">
              <div className="grid gap-2 text-[0.72rem] text-[#bbb] font-semibold tracking-widest"
                style={{ gridTemplateColumns: '2rem 2.4rem 2.4rem 1.5rem 2.4rem 2.4rem' }}>
                <span /><span className="text-center">A</span><span className="text-center">B</span>
                <span /><span className="text-center">C</span><span className="text-center">D</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col items-center gap-1.5">
              {rows.map((row, ri) => {
                const [a, b, c, d] = row
                const tier = getTier(ri * 4 + 1)
                const tierInfo = TIER_META[tier]

                return (
                  <React.Fragment key={ri}>
                    {/* Section dividers */}
                    {ri === 0 && (
                      <div className="w-full max-w-[320px] flex items-center gap-2 mb-1">
                        <div className="flex-1 h-px" style={{ background: tierInfo.border }} />
                        <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full border"
                          style={{ color: tierInfo.text, borderColor: tierInfo.border, background: tierInfo.bg }}>
                          ⭐ VIP — Rows 1–2
                        </span>
                        <div className="flex-1 h-px" style={{ background: tierInfo.border }} />
                      </div>
                    )}
                    {ri === 2 && (
                      <div className="w-full max-w-[320px] flex items-center gap-2 my-1">
                        <div className="flex-1 h-px bg-[#3b82f6]" />
                        <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full border border-[#3b82f6] bg-[#eff6ff] text-[#1d4ed8]">
                          Economy — Rows 3–4
                        </span>
                        <div className="flex-1 h-px bg-[#3b82f6]" />
                      </div>
                    )}
                    {ri === 4 && (
                      <div className="w-full max-w-[320px] flex items-center gap-2 my-1">
                        <div className="flex-1 h-px bg-[#b7e4c7]" />
                        <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full border border-[#b7e4c7] bg-[#f0faf3] text-[#1a7a40]">
                          Standard — Rows 5–10
                        </span>
                        <div className="flex-1 h-px bg-[#b7e4c7]" />
                      </div>
                    )}

                    <div className="grid gap-2 items-center"
                      style={{ gridTemplateColumns: '2rem 2.4rem 2.4rem 1.5rem 2.4rem 2.4rem' }}>
                      <span className="text-[0.7rem] text-[#ccc] text-center font-semibold">{ri + 1}</span>
                      <SeatBtn seat={a} />
                      <SeatBtn seat={b} />
                      <span />
                      <SeatBtn seat={c} />
                      <SeatBtn seat={d} />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* BOOKING SUMMARY */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-6">
              <h2 className="text-[1rem] font-bold text-[#111] mb-5 m-0">Booking Summary</h2>

              {selected.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <MdAirlineSeatReclineNormal size={36} className="text-[#ddd]" />
                  <p className="text-[0.85rem] text-[#bbb] m-0">Tap a seat on the map to select it</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selected.map(s => {
                      const t = TIER_META[s.tier]
                      return (
                        <span key={s.id} className="px-3 py-1 rounded-full text-[0.75rem] font-bold border"
                          style={{ background: t.bg, color: t.text, borderColor: t.border }}>
                          {s.label} · KES {seatPrice(s.tier).toLocaleString()}
                        </span>
                      )
                    })}
                  </div>

                  <div className="border-t border-[#f0f0f0] pt-4 mb-5 flex flex-col gap-2">
                    {['vip', 'economy', 'standard'].map(tier => {
                      const seats = selected.filter(s => s.tier === tier)
                      if (!seats.length) return null
                      const t = TIER_META[tier]
                      return (
                        <div key={tier} className="flex justify-between text-[0.82rem]" style={{ color: '#777' }}>
                          <span>{seats.length}× {t.label} @ KES {seatPrice(tier).toLocaleString()}</span>
                          <span style={{ color: t.text, fontWeight: 600 }}>
                            KES {(seats.length * seatPrice(tier)).toLocaleString()}
                          </span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between text-[1rem] font-bold text-[#111] mt-2 pt-2 border-t border-[#f0f0f0]">
                      <span>Total</span>
                      <span style={{ color: '#d48b10' }}>KES {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleBook}
                disabled={selected.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[0.95rem] font-bold transition-all duration-150 active:scale-95"
                style={{
                  background: selected.length === 0 ? '#f0f0f0' : '#f5a623',
                  color:      selected.length === 0 ? '#bbb'    : '#1a1200',
                  border: 'none',
                  cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: selected.length > 0 ? '0 4px 18px rgba(245,166,35,0.35)' : 'none',
                }}>
                <FiCheckCircle size={18} />
                {selected.length === 0 ? 'Select a seat to continue' : `Confirm ${selected.length} Seat${selected.length > 1 ? 's' : ''}`}
              </button>

              <p className="text-[0.72rem] text-[#bbb] text-center mt-3 m-0">You'll review details before payment</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}