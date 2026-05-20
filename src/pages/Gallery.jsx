import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const IMAGES = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', category: 'exterior' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80', category: 'interior' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80', category: 'exterior' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80', category: 'interior' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', category: 'exterior' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80', category: 'interior' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', category: 'terminal' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80', category: 'exterior' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&q=80', category: 'terminal' },
  { id: 10, src: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80', category: 'interior' },
  { id: 11, src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80', category: 'terminal' },
  { id: 12, src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80', category: 'exterior' },
]

const FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'exterior', label: 'Exterior' },
  { key: 'interior', label: 'Interior' },
  { key: 'terminal', label: 'Terminal' },
]

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onPrev, onNext])

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <img
        src={images[index].src}
        alt=""
        onClick={e => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
      />
      <button onClick={onClose} className="fixed top-4 right-4 w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer">
        <FiX size={17} />
      </button>
      <button onClick={e => { e.stopPropagation(); onPrev() }} className="fixed left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer">
        <FiChevronLeft size={20} />
      </button>
      <button onClick={e => { e.stopPropagation(); onNext() }} className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer">
        <FiChevronRight size={20} />
      </button>
      <span className="fixed bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono">
        {index + 1} / {images.length}
      </span>
    </div>
  )
}

export default function Gallery() {
  const navigate = useNavigate()
  const [active, setActive] = useState('all')
  const [lbIndex, setLbIndex] = useState(null)

  const filtered = active === 'all' ? IMAGES : IMAGES.filter(i => i.category === active)

  const open  = useCallback((i) => setLbIndex(i), [])
  const close = useCallback(() => setLbIndex(null), [])
  const prev  = useCallback(() => setLbIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next  = useCallback(() => setLbIndex(i => (i + 1) % filtered.length), [filtered.length])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Outfit','Segoe UI',sans-serif" }}>

      {/* NAV */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
          <FiArrowLeft size={17} className="text-gray-600" />
        </button>
        <h1 className="text-[15px] font-bold text-gray-900">Gallery</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">

        {/* FILTERS */}
        <div className="flex gap-2 mb-7">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={[
                'px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer',
                active === f.key
                  ? 'bg-[#f5a623] text-[#1a1200] border-[#f5a623]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              onClick={() => open(i)}
              className="aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group"
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {lbIndex !== null && (
        <Lightbox images={filtered} index={lbIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </div>
  )
}