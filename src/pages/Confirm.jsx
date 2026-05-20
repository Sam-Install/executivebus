import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft, FiUser, FiPhone, FiMail,
  FiCheckCircle, FiAlertCircle, FiShield, FiLock,
  FiDownload, FiPrinter,
} from 'react-icons/fi'
import {
  MdAirlineSeatReclineNormal, MdPhoneAndroid,
  MdPinInvoke, MdOutlineVerified, MdSignalCellularAlt,
} from 'react-icons/md'
import { BsPhoneFill, BsWifi } from 'react-icons/bs'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { toast } from 'sonner'

const STEPS = ['Passenger Details', 'Pay via M-Pesa']

const TIER_META = {
  vip:      { label: 'VIP',      bg: '#fff9ed', border: '#f5a623', text: '#d48b10' },
  economy:  { label: 'Economy',  bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
  standard: { label: 'Standard', bg: '#f0faf3', border: '#b7e4c7', text: '#1a7a40' },
}

// ── Ticket component (used for both screen render & print/download) ──
function TicketCard({ bus, seats, total, passenger, bookingRef, forPrint = false }) {
  const tierColors = seats.map(s => TIER_META[s.tier] || TIER_META.standard)
  const primaryTier = tierColors[0]

  return (
    <div
      id="ticket-card"
      style={{
        fontFamily: "'Outfit','Segoe UI',sans-serif",
        width: forPrint ? '680px' : '100%',
        background: '#fff',
        borderRadius: forPrint ? '20px' : '16px',
        border: '1.5px solid #eaeaea',
        overflow: 'hidden',
        boxShadow: forPrint ? 'none' : '0 4px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header strip */}
      <div style={{
        background: 'linear-gradient(135deg, #f5a623 0%, #e8920e 100%)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: 'rgba(26,18,0,0.6)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>
            ExecutiveBus · E-Ticket
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1a1200', letterSpacing: '-0.5px' }}>
            {bus.from} → {bus.to}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: 'rgba(26,18,0,0.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Booking Ref</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#1a1200', letterSpacing: '1px' }}>{bookingRef}</div>
        </div>
      </div>

      {/* Dotted tear line */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#fafafa', padding: '0 16px' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f7f8fa', border: '1.5px solid #eaeaea', flexShrink: 0, marginLeft: -28 }} />
        <div style={{ flex: 1, borderTop: '2px dashed #e5e5e5', margin: '0 8px' }} />
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f7f8fa', border: '1.5px solid #eaeaea', flexShrink: 0, marginRight: -28 }} />
      </div>

      {/* Main info grid */}
      <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: '#fafafa' }}>
        {[
          ['Passenger', passenger.fullName],
          ['Departure', bus.departs || 'See operator'],
          ['Phone', passenger.phone],
          ['Email', passenger.email],
        ].map(([label, val]) => (
          <div key={label}>
            <div style={{ fontSize: '10px', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111', wordBreak: 'break-all' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Seats */}
      <div style={{ padding: '16px 24px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '10px', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 10 }}>Seats</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {seats.map(s => {
            const t = TIER_META[s.tier] || TIER_META.standard
            return (
              <span key={s.id} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 999,
                background: t.bg, color: t.text, border: `1.5px solid ${t.border}`,
                fontSize: 12, fontWeight: 800,
              }}>
                🪑 {s.label} · {t.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Amount + barcode strip */}
      <div style={{
        padding: '16px 24px',
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 3 }}>Amount Paid</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#d48b10' }}>KES {total.toLocaleString()}</div>
          <div style={{ fontSize: '11px', color: '#aaa', marginTop: 2 }}>
            {seats.length} seat{seats.length > 1 ? 's' : ''} · M-Pesa Payment
          </div>
        </div>

        {/* Simulated barcode */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', gap: 2, height: 48 }}>
            {[3,1,2,4,1,3,2,1,4,2,1,3,2,4,1,2,3,1,2,4,1,3,1,2].map((w, i) => (
              <div key={i} style={{ width: w * 2, background: i % 5 === 0 ? '#ddd' : '#111', borderRadius: 1, height: '100%' }} />
            ))}
          </div>
          <div style={{ fontSize: '9px', color: '#aaa', fontFamily: 'monospace', letterSpacing: '3px' }}>
            {bookingRef}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 24px',
        background: '#f5a623',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: '10px', color: 'rgba(26,18,0,0.65)', fontWeight: 600 }}>
          Valid for travel on the booked date only · Non-transferable · Keep this ticket safe
        </span>
      </div>
    </div>
  )
}

export default function Confirm() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { bus, seats, total } = location.state || {}

  const [step, setStep]           = useState(0)
  const [passenger, setPassenger] = useState({ fullName: '', phone: '', email: '' })
  const [mpesa, setMpesa]         = useState('')
  const [paying, setPaying]       = useState(false)
  const [pushed, setPushed]       = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const bookingRef = useRef('EB' + Math.random().toString(36).slice(2, 8).toUpperCase())

  if (!bus || !seats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f7f8fa]">
        <FiAlertCircle size={48} style={{ color: '#f5a623' }} />
        <p className="text-[#555] text-lg font-medium">No booking data found.</p>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
          style={{ background: '#f5a623', color: '#1a1200' }}>
          <FiArrowLeft size={16} /> Back to Search
        </button>
      </div>
    )
  }

  const inputClass = 'w-full pl-11 pr-4 py-3 text-sm border border-[#e5e5e5] rounded-lg outline-none bg-white placeholder:text-gray-300 transition-all duration-200'
  const focusStyle = {
    onFocus: e => { e.target.style.borderColor = '#f5a623'; e.target.style.boxShadow = '0 0 0 2px rgba(245,166,35,0.15)' },
    onBlur:  e => { e.target.style.borderColor = '';       e.target.style.boxShadow = '' },
  }

  const handlePassengerSubmit = (e) => {
    e.preventDefault()
    const { fullName, phone, email } = passenger
    if (!fullName.trim()) { toast.error('Please enter your full name'); return }
    if (!phone.trim() || phone.length < 9) { toast.error('Please enter a valid phone number'); return }
    if (!email.trim() || !email.includes('@')) { toast.error('Please enter a valid email'); return }
    setStep(1)
  }

  const handleStkPush = () => {
    if (!mpesa.trim() || mpesa.replace(/\D/g, '').length < 9) {
      toast.error('Enter a valid M-Pesa number'); return
    }
    setPaying(true)
    setTimeout(() => { setPaying(false); setPushed(true); toast.success('STK Push sent! Check your phone.') }, 2000)
  }

  const handleConfirmPayment = () => {
    setPaying(true)
    setTimeout(() => { setPaying(false); setConfirmed(true) }, 2500)
  }

  // ── PRINT ────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=700')
    const ticketHTML = document.getElementById('ticket-card')?.outerHTML || ''
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ExecutiveBus Ticket — ${bookingRef.current}</title>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              background: #f7f8fa;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 40px;
              font-family: 'Outfit', 'Segoe UI', sans-serif;
            }
            @media print {
              body { background: #fff; padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div style="width:680px;">
            ${ticketHTML}
            <div class="no-print" style="margin-top:24px; text-align:center;">
              <button onclick="window.print()" style="
                padding: 12px 32px; border-radius: 12px;
                background: #f5a623; color: #1a1200;
                border: none; font-size: 14px; font-weight: 800;
                cursor: pointer; font-family: 'Outfit', sans-serif;
              ">🖨️ Print Ticket</button>
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    // Auto-trigger print after fonts load
    setTimeout(() => printWindow.print(), 800)
  }

  // ── DOWNLOAD as PNG (via canvas) ─────────────────────────────────────
  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Dynamically load html2canvas from CDN
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const el = document.getElementById('ticket-card')
      if (!el) { toast.error('Ticket not found'); return }

      const canvas = await window.html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `ExecutiveBus-Ticket-${bookingRef.current}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Ticket downloaded!')
    } catch (err) {
      console.error(err)
      toast.error('Download failed — try Print instead')
    } finally {
      setDownloading(false)
    }
  }

  // ── CONFIRMATION SCREEN ──────────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] px-4 py-10"
        style={{ fontFamily: "'Outfit','Segoe UI',sans-serif" }}>
        <div className="max-w-xl mx-auto">

          {/* Success badge */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(245,166,35,0.12)', border: '2px solid #f5a623' }}>
              <FiCheckCircle size={26} style={{ color: '#f5a623' }} />
            </div>
            <h2 className="text-xl font-bold text-[#111] mb-1">Booking Confirmed!</h2>
            <p className="text-sm text-[#888]">Your seats are reserved. Save or print your ticket below.</p>
          </div>

          {/* THE TICKET */}
          <div className="mb-6">
            <TicketCard
              bus={bus}
              seats={seats}
              total={total}
              passenger={passenger}
              bookingRef={bookingRef.current}
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95 disabled:opacity-60"
              style={{
                background: downloading ? '#e5e5e5' : '#111',
                color: downloading ? '#aaa' : '#fff',
                boxShadow: downloading ? 'none' : '0 4px 18px rgba(0,0,0,0.18)',
              }}>
              {downloading
                ? <><span className="w-4 h-4 border-2 border-[#ccc] border-t-[#aaa] rounded-full animate-spin" /> Saving...</>
                : <><FiDownload size={15} /> Download</>}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-95"
              style={{
                background: '#f5a623',
                color: '#1a1200',
                boxShadow: '0 4px 18px rgba(245,166,35,0.35)',
              }}>
              <FiPrinter size={15} /> Print Ticket
            </button>
          </div>

          {/* Hint */}
          <p className="text-center text-xs text-[#bbb] mb-5">
            💡 On mobile: tap <strong>Download</strong> to save to your photos, or <strong>Print</strong> to share as PDF via your browser.
          </p>

          <button onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl text-sm font-semibold border border-[#eee] text-[#555] hover:bg-[#f5f5f5] transition-colors">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ── BOOKING FLOW (unchanged) ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f8fa]" style={{ fontFamily: "'Outfit','Segoe UI',sans-serif" }}>

      {/* TOP BAR */}
      <div className="bg-white border-b border-[#eee] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-4 flex items-center gap-4">
          <button onClick={() => step === 0 ? navigate(-1) : setStep(0)}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#eee] hover:bg-[#f5f5f5] transition-colors cursor-pointer">
            <FiArrowLeft size={20} className="text-[#333]" />
          </button>
          <div>
            <h1 className="text-[1.05rem] font-bold text-[#111] leading-tight m-0">
              {step === 0 ? 'Passenger Details' : 'M-Pesa Payment'}
            </h1>
            <p className="text-[0.78rem] text-[#888] m-0 mt-0.5">{bus.from} → {bus.to} · {bus.departs}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 pt-8 pb-20">

        {/* STEP INDICATOR */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200"
                  style={{ background: i <= step ? '#f5a623' : '#f0f0f0', borderColor: i <= step ? '#f5a623' : '#ddd', color: i <= step ? '#1a1200' : '#bbb' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-[0.8rem] font-semibold hidden sm:block"
                  style={{ color: i === step ? '#d48b10' : '#bbb' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-3 transition-all duration-300"
                  style={{ background: step > i ? '#f5a623' : '#e5e5e5' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* SEATS SUMMARY */}
        <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-5 mb-6">
          <p className="text-[0.72rem] text-[#aaa] uppercase tracking-widest font-semibold mb-3">Your Seats</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {seats.map(s => {
              const t = TIER_META[s.tier] || TIER_META.standard
              return (
                <span key={s.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.78rem] font-bold border"
                  style={{ background: t.bg, color: t.text, borderColor: t.border }}>
                  <MdAirlineSeatReclineNormal size={13} />{s.label} · {t.label}
                </span>
              )
            })}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#f0f0f0]">
            <span className="text-sm text-[#888]">{seats.length} seat{seats.length > 1 ? 's' : ''} · {bus.from} → {bus.to}</span>
            <span className="text-[1rem] font-extrabold" style={{ color: '#d48b10' }}>KES {total.toLocaleString()}</span>
          </div>
        </div>

        {/* STEP 0: PASSENGER DETAILS */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-6">
            <h3 className="text-[1rem] font-bold text-[#111] mb-5">Your Details</h3>
            <form onSubmit={handlePassengerSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block">Full Name</label>
                <div className="relative">
                  <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#d48b10' }} />
                  <input type="text" placeholder="John Doe" value={passenger.fullName}
                    onChange={e => setPassenger({ ...passenger, fullName: e.target.value })}
                    className={inputClass} {...focusStyle} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block">Phone Number</label>
                <div className="relative">
                  <FiPhone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#d48b10' }} />
                  <input type="tel" placeholder="+254 700 000 000" value={passenger.phone}
                    onChange={e => setPassenger({ ...passenger, phone: e.target.value })}
                    className={inputClass} {...focusStyle} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block">Email Address</label>
                <div className="relative">
                  <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#d48b10' }} />
                  <input type="email" placeholder="you@example.com" value={passenger.email}
                    onChange={e => setPassenger({ ...passenger, email: e.target.value })}
                    className={inputClass} {...focusStyle} />
                </div>
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
                style={{ background: '#f5a623', color: '#1a1200', boxShadow: '0 4px 18px rgba(245,166,35,0.35)' }}>
                Continue to Payment →
              </button>
            </form>
          </div>
        )}

        {/* STEP 1: MPESA PAYMENT */}
        {step === 1 && (
          <div className="space-y-4">
            {!pushed ? (
              <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm overflow-hidden">
                <div className="px-6 pt-6 pb-5" style={{ background: 'linear-gradient(135deg, #1a5c1a, #2e7d32)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <BsPhoneFill size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm m-0">M-Pesa</p>
                        <p className="text-white/70 text-xs m-0">Safaricom Mobile Money</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BsWifi size={14} className="text-white/60" />
                      <MdSignalCellularAlt size={16} className="text-white/60" />
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                    <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Amount to Pay</p>
                    <p className="text-white font-extrabold text-2xl">KES {total.toLocaleString()}</p>
                    <p className="text-white/60 text-xs mt-1">{bus.from} → {bus.to} · {seats.length} seat{seats.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="p-6">
                  <label className="text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block">
                    M-Pesa Registered Number
                  </label>
                  <div className="flex mb-2">
                    <span className="flex items-center gap-2 px-4 text-sm text-[#555] bg-[#f5f5f5] border border-r-0 border-[#e5e5e5] rounded-l-lg font-semibold">
                      <MdPhoneAndroid size={16} style={{ color: '#2e7d32' }} /> +254
                    </span>
                    <input type="tel" placeholder="7XX XXX XXX" value={mpesa}
                      onChange={e => setMpesa(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="flex-1 px-4 py-3 text-sm border border-[#e5e5e5] rounded-r-lg bg-white outline-none placeholder:text-gray-300 font-medium tracking-wide"
                      onFocus={e => { e.target.style.borderColor='#2e7d32'; e.target.style.boxShadow='0 0 0 2px rgba(46,125,50,0.15)' }}
                      onBlur={e => { e.target.style.borderColor=''; e.target.style.boxShadow='' }}
                    />
                  </div>
                  <p className="text-xs text-[#aaa] mb-5 flex items-center gap-1.5">
                    <FiShield size={11} style={{ color: '#2e7d32' }} />
                    Secured by Safaricom M-Pesa encryption
                  </p>
                  <button onClick={handleStkPush} disabled={paying}
                    className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 active:scale-95"
                    style={{
                      background: paying ? '#e5e5e5' : 'linear-gradient(135deg,#1a5c1a,#2e7d32)',
                      color: paying ? '#aaa' : '#fff',
                      boxShadow: paying ? 'none' : '0 4px 18px rgba(46,125,50,0.35)',
                    }}>
                    {paying
                      ? <><span className="w-4 h-4 border-2 border-[#ccc] border-t-[#aaa] rounded-full animate-spin" /> Sending STK Push...</>
                      : <><MdPhoneAndroid size={18} /> Send STK Push</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#eaeaea] shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MdOutlineVerified size={20} style={{ color: '#2e7d32' }} />
                    <span className="text-sm font-bold text-[#2e7d32]">STK Push Sent Successfully</span>
                  </div>
                  <p className="text-xs text-[#888]">A payment request was sent to +254 {mpesa}</p>
                </div>

                {/* Phone mockup */}
                <div className="flex justify-center mb-6">
                  <div className="w-52 rounded-[28px] border-4 border-[#222] bg-[#111] p-1.5 shadow-2xl">
                    <div className="flex items-center justify-between px-3 py-1 mb-1">
                      <span className="text-white text-[9px] font-semibold">9:41</span>
                      <div className="flex items-center gap-1">
                        <MdSignalCellularAlt size={10} className="text-white" />
                        <BsWifi size={10} className="text-white" />
                      </div>
                    </div>
                    <div className="bg-white rounded-[20px] p-3">
                      <div className="rounded-xl overflow-hidden mb-2" style={{ background: '#1a5c1a' }}>
                        <div className="flex items-center gap-2 px-3 py-2">
                          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                            <span className="text-white text-[9px] font-extrabold">M</span>
                          </div>
                          <span className="text-white text-[10px] font-bold">M-PESA</span>
                        </div>
                        <div className="bg-white px-3 py-3">
                          <p className="text-[#222] font-bold text-[10px] mb-1">Pay KES {total.toLocaleString()}</p>
                          <p className="text-[#555] text-[9px] leading-relaxed mb-2">
                            ExecutiveBus — {bus.from} to {bus.to} ticket payment.
                          </p>
                          <div className="bg-[#f5f5f5] rounded-lg p-2 mb-2">
                            <p className="text-[#888] text-[8px] uppercase tracking-wide mb-1">Enter M-Pesa PIN</p>
                            <div className="flex gap-1">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-4 h-4 rounded-full border-2 border-[#ddd] bg-white" />
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-1.5">
                            <div className="flex-1 py-1.5 rounded-lg text-center text-[9px] font-bold text-white" style={{ background: '#1a5c1a' }}>OK</div>
                            <div className="flex-1 py-1.5 rounded-lg text-center text-[9px] font-bold text-[#555] bg-[#f0f0f0]">Cancel</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: <MdPhoneAndroid size={16} />, text: 'A pop-up appeared on your phone', done: true },
                    { icon: <MdPinInvoke size={16} />,    text: 'Enter your 4-digit M-Pesa PIN',    done: false },
                    { icon: <FiLock size={14} />,          text: 'Tap OK to authorise the payment',  done: false },
                  ].map(({ icon, text, done }, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: done ? 'rgba(46,125,50,0.06)' : '#f7f8fa', border: `1px solid ${done ? 'rgba(46,125,50,0.2)' : '#eee'}` }}>
                      <span style={{ color: done ? '#2e7d32' : '#aaa' }}>{icon}</span>
                      <span className="text-sm" style={{ color: done ? '#2e7d32' : '#555' }}>{text}</span>
                      {done && <FiCheckCircle size={14} className="ml-auto" style={{ color: '#2e7d32' }} />}
                    </div>
                  ))}
                </div>

                <button onClick={handleConfirmPayment} disabled={paying}
                  className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 mb-3"
                  style={{
                    background: paying ? '#e5e5e5' : '#f5a623',
                    color: paying ? '#aaa' : '#1a1200',
                    boxShadow: paying ? 'none' : '0 4px 18px rgba(245,166,35,0.35)',
                  }}>
                  {paying
                    ? <><span className="w-4 h-4 border-2 border-[#ccc] border-t-[#aaa] rounded-full animate-spin" /> Confirming...</>
                    : <><FiCheckCircle size={16} /> I've Paid — Confirm Booking</>}
                </button>

                <button onClick={() => { setPushed(false); setMpesa('') }}
                  className="w-full text-xs text-center text-[#aaa] hover:text-[#555] transition-colors underline">
                  Use a different number
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-[#bbb]">
              <RiSecurePaymentLine size={14} />
              <span>Payments processed securely via Safaricom M-Pesa</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}