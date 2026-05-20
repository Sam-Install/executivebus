import React, { useState } from 'react'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'
import { toast } from 'sonner'

const ContactUs = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, phone, subject, message } = form
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success('Message sent successfully!')
    setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
  }

  const inputClass = 'w-full px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-lg bg-white outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a62320] transition-all duration-200 placeholder:text-gray-300'
  const labelClass = 'text-xs font-semibold text-[#555] uppercase tracking-wide mb-1.5 block'

  return (
    <section className='pt-28 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#f7f8fa] min-h-screen'>

      <div className='text-center mb-10'>
        <h2 className='text-3xl font-bold text-[#111]'>Get In Touch</h2>
        <p className='text-[#888] text-sm mt-2'>We'd love to hear from you. Fill out the form below.</p>
      </div>

      <div className='max-w-5xl mx-auto bg-white rounded-2xl border border-[#eaeaea] shadow-sm overflow-hidden flex flex-col md:flex-row'>

        {/* Left */}
        <div className='md:w-2/5 p-8 border-b md:border-b-0 md:border-r border-[#f0f0f0]'>
          <h3 className='text-lg font-bold text-[#111] mb-4'>Contact Details</h3>
          <div className='w-10 h-px mb-6' style={{ background: '#f5a623' }} />

          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <span style={{ color: '#d48b10' }}><MdLocationOn size={18} /></span>
                <span className='text-sm font-semibold text-[#333]'>Head Office</span>
              </div>
              <p className='text-sm text-[#777] leading-relaxed pl-6'>Ground Floor, Zahra Building<br />Nairobi River Rd, Nairobi</p>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-1'>
                <span style={{ color: '#d48b10' }}><MdPhone size={16} /></span>
                <span className='text-sm font-semibold text-[#333]'>Phone</span>
              </div>
              <a href='tel:+254729356561' className='text-sm text-[#777] pl-6 block' style={{ transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color='#d48b10'} onMouseLeave={e => e.target.style.color=''}>
                +254 729 356 561
              </a>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-1'>
                <span style={{ color: '#d48b10' }}><MdEmail size={16} /></span>
                <span className='text-sm font-semibold text-[#333]'>Email</span>
              </div>
              <a href='mailto:info@example.com' className='text-sm text-[#777] pl-6 block' style={{ transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color='#d48b10'} onMouseLeave={e => e.target.style.color=''}>
                info@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className='md:w-3/5 p-8 bg-[#fafafa]'>
          <form onSubmit={handleSubmit} className='space-y-4'>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>First Name</label>
                <input type='text' name='firstName' value={form.firstName} onChange={handleChange} placeholder='Enter first name' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input type='text' name='lastName' value={form.lastName} onChange={handleChange} placeholder='Enter last name' className={inputClass} />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>Email Address</label>
                <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Enter email address' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Mobile Number</label>
                <div className='flex'>
                  <span className='flex items-center px-3 text-sm text-[#777] bg-[#f5f5f5] border border-r-0 border-[#e5e5e5] rounded-l-lg'>+254</span>
                  <input type='tel' name='phone' value={form.phone} onChange={handleChange} placeholder='700 000 000'
                    className='flex-1 px-3 py-2.5 text-sm border border-[#e5e5e5] rounded-r-lg bg-white outline-none placeholder:text-gray-300 transition-all duration-200'
                    style={{ '--tw-ring-color': '#f5a62320' }}
                    onFocus={e => { e.target.style.borderColor='#f5a623'; e.target.style.boxShadow='0 0 0 2px #f5a62320' }}
                    onBlur={e => { e.target.style.borderColor=''; e.target.style.boxShadow='' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Subject</label>
              <input type='text' name='subject' value={form.subject} onChange={handleChange} placeholder='Enter subject of enquiry / your message' className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea name='message' value={form.message} onChange={handleChange} placeholder='Your message' rows={5}
                className={`${inputClass} resize-none`} />
            </div>

            <button
              type='submit'
              className='text-[#1a1200] text-sm font-bold px-8 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95'
              style={{ background: '#f5a623', boxShadow: '0 4px 18px rgba(245,166,35,0.35)' }}
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  )
}

export default ContactUs