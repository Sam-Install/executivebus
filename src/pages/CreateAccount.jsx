import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail, MdLock, MdPerson, MdPhone, MdDirectionsBus } from 'react-icons/md'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'sonner'

const CreateAccount = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.fullName || !form.email || !form.phone || !form.password) { toast.error('Please fill in all fields'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    toast.success('Account created successfully!')
    navigate('/signin')
  }

  const inputClass = 'w-full pl-11 pr-4 py-3 text-sm border border-[#e5e5e5] rounded-lg outline-none transition-all duration-200 placeholder:text-gray-300 bg-white'

  const focusStyle = {
    onFocus: e => { e.target.style.borderColor = '#f5a623'; e.target.style.boxShadow = '0 0 0 2px rgba(245,166,35,0.15)' },
    onBlur:  e => { e.target.style.borderColor = '';       e.target.style.boxShadow = '' },
  }

  return (
    <section className='pt-25 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#f7f8fa] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>

        {/* Card */}
        <div className='bg-white rounded-2xl shadow-sm border border-[#eaeaea] p-8'>

          {/* Logo inside card */}
          <div className='flex items-center gap-2 mb-6'>
            <MdDirectionsBus size={26} style={{ color: '#f5a623' }} />
            <span className='text-xl font-bold text-[#111] tracking-tight'>
              Executive<span style={{ color: '#f5a623' }}>Bus</span>
            </span>
          </div>

          <h2 className='text-xl font-bold text-[#111] mb-1'>Create an account</h2>
          <p className='text-sm text-[#888] mb-6'>Join ExecutiveBus to start booking trips</p>

          <form onSubmit={handleSubmit} className='space-y-5'>

            {/* Full Name */}
            <div>
              <label className='text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block'>Full Name</label>
              <div className='relative'>
                <MdPerson size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2' style={{ color: '#d48b10' }} />
                <input type='text' name='fullName' value={form.fullName} onChange={handleChange}
                  placeholder='John Doe' className={inputClass} {...focusStyle} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className='text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block'>Email Address</label>
              <div className='relative'>
                <MdEmail size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2' style={{ color: '#d48b10' }} />
                <input type='email' name='email' value={form.email} onChange={handleChange}
                  placeholder='you@example.com' className={inputClass} {...focusStyle} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className='text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block'>Phone Number</label>
              <div className='relative'>
                <MdPhone size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2' style={{ color: '#d48b10' }} />
                <input type='tel' name='phone' value={form.phone} onChange={handleChange}
                  placeholder='+254 700 000 000' className={inputClass} {...focusStyle} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='text-xs font-semibold text-[#555] uppercase tracking-wide mb-2 block'>Password</label>
              <div className='relative'>
                <MdLock size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2' style={{ color: '#d48b10' }} />
                <input type={showPassword ? 'text' : 'password'} name='password' value={form.password} onChange={handleChange}
                  placeholder='Min. 6 characters' className={`${inputClass} pr-11`} {...focusStyle} />
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555] transition-colors'>
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className='text-xs text-[#aaa]'>
              By creating an account you agree to our{' '}
              <a href='#' className='hover:underline' style={{ color: '#d48b10' }}>Terms of Service</a>{' '}
              and{' '}
              <a href='#' className='hover:underline' style={{ color: '#d48b10' }}>Privacy Policy</a>.
            </p>

            {/* Submit */}
            <button type='submit'
              className='w-full text-sm font-bold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95'
              style={{ background: '#f5a623', color: '#1a1200', boxShadow: '0 4px 18px rgba(245,166,35,0.35)' }}>
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className='flex items-center gap-3 my-5'>
            <div className='flex-1 h-px bg-[#f0f0f0]' />
            <span className='text-xs text-[#aaa]'>Already have an account?</span>
            <div className='flex-1 h-px bg-[#f0f0f0]' />
          </div>

          <Link to='/signin'
            className='block w-full text-center text-sm font-semibold py-3 rounded-lg border transition-all duration-200 hover:bg-[rgba(245,166,35,0.08)]'
            style={{ color: '#d48b10', borderColor: 'rgba(245,166,35,0.45)' }}>
            Sign In
          </Link>

        </div>

        <p className='text-center text-xs text-[#bbb] mt-6'>
          © {new Date().getFullYear()} ExecutiveBus. All rights reserved.
        </p>
      </div>
    </section>
  )
}

export default CreateAccount