import React, { useState } from 'react'
import {
  FiPackage,
  FiSearch,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiChevronRight,
  FiArrowLeft,
  FiBell,
  FiInbox,
  FiBox,
} from 'react-icons/fi'

const STEPS = ['placed', 'in_transit', 'out_for_delivery', 'delivered']

const STATUS_META = {
  placed: {
    label: 'Order Placed',
    desc: 'Your parcel has been registered and is being prepared for dispatch.',
    Icon: FiPackage,
  },
  in_transit: {
    label: 'In Transit',
    desc: 'Your parcel is on its way to the delivery hub.',
    Icon: FiTruck,
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    desc: 'Your parcel is with the courier and arriving today.',
    Icon: FiMapPin,
  },
  delivered: {
    label: 'Delivered',
    desc: 'Your parcel has been successfully delivered.',
    Icon: FiCheckCircle,
  },
}

const MOCK_PARCEL = {
  id: 'TRK-9284710',
  sender: 'Jumia Nairobi Hub',
  recipient: 'Jane Mwangi',
  address: 'Bamburi Beach, Mombasa',
  weight: '1.2 kg',
  eta: 'Today, 3:00 PM – 5:00 PM',
}

function useToasts() {
  const [toasts, setToasts] = useState([])
  const push = (msg, type = 'info') => {
    const id = Date.now()
    setToasts(t => [{ id, msg, type }, ...t])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000)
  }
  return { toasts, push }
}

function Toasts({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg border
            ${t.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-[#fffbf0] border-[#f5a623]/40 text-[#1a1200]'
            }`}
        >
          <FiBell size={14} className={t.type === 'success' ? 'text-green-600' : 'text-[#f5a623]'} />
          {t.msg}
        </div>
      ))}
    </div>
  )
}

function ProgressStepper({ currentStatus }) {
  const currentIdx = STEPS.indexOf(currentStatus)
  return (
    <div className="flex items-start my-8">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx
        const active = i === currentIdx
        const { Icon, label } = STATUS_META[step]
        const isDelivered = step === 'delivered'
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${done
                    ? isDelivered
                      ? 'bg-green-50 border-green-400'
                      : 'bg-[#fffbf0] border-[#f5a623]'
                    : 'bg-gray-100 border-gray-200'
                  }
                  ${active ? 'ring-4 ring-[#f5a623]/20' : ''}
                `}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-300
                    ${done
                      ? isDelivered ? 'text-green-600' : 'text-[#d48b10]'
                      : 'text-gray-300'
                    }`}
                />
              </div>
              <span
                className={`mt-1.5 text-[10px] text-center leading-tight max-w-[72px]
                  ${active ? 'font-bold' : 'font-normal'}
                  ${done
                    ? isDelivered ? 'text-green-600' : 'text-[#d48b10]'
                    : 'text-gray-300'
                  }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-[3px] mt-[18px] mx-1 rounded-full transition-all duration-500
                  ${i < currentIdx ? 'bg-[#f5a623]' : 'bg-gray-200'}`}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function ParcelCard({ parcel, status }) {
  const { Icon, label, desc } = STATUS_META[status]
  const isDelivered = status === 'delivered'
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5 shadow-sm">
      {/* Top row */}
      <div className="flex justify-between items-start gap-3 mb-4">
        <div>
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Tracking ID</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900 font-mono tracking-wider">{parcel.id}</p>
        </div>
        <span
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shrink-0
            ${isDelivered
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-[#fffbf0] text-[#d48b10] border-[#f5a623]/30'
            }`}
        >
          <Icon size={12} /> {label}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        {[
          [FiBox, 'Sender', parcel.sender],
          [FiUser, 'Recipient', parcel.recipient],
          [FiMapPin, 'Destination', parcel.address],
          [FiClock, 'ETA', parcel.eta],
        ].map(([Ic, k, v]) => (
          <div key={k}>
            <p className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
              <Ic size={10} /> {k}
            </p>
            <p className="text-gray-800 font-medium text-sm">{v}</p>
          </div>
        ))}
      </div>

      {/* Status banner */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium border
          ${isDelivered
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-[#fffbf0] text-[#d48b10] border-[#f5a623]/25'
          }`}
      >
        <Icon size={15} className="shrink-0" />
        {desc}
      </div>
    </div>
  )
}

export default function Parcel() {
  const [input, setInput] = useState('')
  const [parcel, setParcel] = useState(null)
  const [status, setStatus] = useState('placed')
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('search')
  const { toasts, push } = useToasts()

  const handleTrack = () => {
    if (!input.trim()) return
    setLoading(true)
    setTimeout(() => {
      setParcel(MOCK_PARCEL)
      setStatus('placed')
      setView('tracking')
      setLoading(false)
      push('Parcel found! Tracking your order.', 'info')
    }, 1200)
  }

  const advance = () => {
    const idx = STEPS.indexOf(status)
    if (idx < STEPS.length - 1) {
      const next = STEPS[idx + 1]
      setStatus(next)
      if (next === 'out_for_delivery') push('Your parcel is out for delivery!', 'warn')
      else if (next === 'delivered') push('Parcel delivered successfully!', 'success')
      else push(`Status updated: ${STATUS_META[next].label}`, 'info')
    }
  }

  const reset = () => {
    setView('search')
    setParcel(null)
    setStatus('placed')
    setInput('')
  }

  return (
    <div
      className="w-full min-h-screen bg-[#f7f8fa]"
      style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}
    >
      <Toasts toasts={toasts} />

      {/* Responsive container: top padding + horizontal padding at all breakpoints */}
      <div className="w-full max-w-2xl mx-auto pt-20 px-4 sm:px-8 md:px-12 lg:px-16 pb-16">

        {/* Search view */}
        {view === 'search' && (
          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <p className="font-bold text-gray-900 text-base mb-1">Enter your tracking number</p>
              <p className="text-sm text-gray-400 mb-6">We'll show you exactly where your parcel is</p>

              <div className="relative mb-4">
                <FiSearch size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleTrack()}
                  placeholder="e.g. TRK-9284710"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm font-mono tracking-widest text-gray-800 bg-white focus:outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 transition-all"
                />
              </div>

              <button
                onClick={handleTrack}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold bg-[#f5a623] text-[#1a1200] transition-all duration-150 hover:bg-[#e09510] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_18px_rgba(245,166,35,0.35)]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#1a1200]/20 border-t-[#1a1200] animate-spin" />
                    Searching…
                  </>
                ) : (
                  <><FiSearch size={15} /> Track Parcel</>
                )}
              </button>

              <p className="text-center text-xs text-gray-300 mt-5">
                Try demo ID:{' '}
                <code className="bg-gray-50 px-1.5 py-0.5 rounded font-mono text-gray-400">TRK-9284710</code>
              </p>
            </div>

            {/* Empty state */}
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <FiInbox size={28} className="text-gray-200" />
              </div>
              <p className="font-semibold text-gray-300 text-base">No parcel tracked yet</p>
              <p className="text-sm text-gray-200 mt-1">Enter a tracking ID above to see live delivery status</p>
            </div>
          </div>
        )}

        {/* Tracking view */}
        {view === 'tracking' && parcel && (
          <div className="space-y-4">
            <ParcelCard parcel={parcel} status={status} />
            <ProgressStepper currentStatus={status} />

            {status === 'delivered' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle size={28} className="text-green-600" />
                </div>
                <p className="font-bold text-green-800 text-lg">Parcel Delivered!</p>
                <p className="text-sm text-green-600 mt-1">Your parcel has arrived. Enjoy!</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="text-xs text-gray-400 font-medium mb-3 flex items-center gap-1.5">
                  <FiBell size={12} className="text-[#f5a623]" /> Simulate a delivery update
                </p>
                <button
                  onClick={advance}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all duration-150"
                >
                  Advance to next status <FiChevronRight size={16} />
                </button>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-400 bg-transparent hover:bg-gray-50 transition-all duration-150"
            >
              <FiArrowLeft size={15} /> Track another parcel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}