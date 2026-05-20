import React from 'react'
import { motion } from 'framer-motion'
import {
  MdAirlineSeatReclineNormal,
  MdOutlineRateReview,
  MdPayment,
  MdMarkEmailRead,
  MdSms,
  MdLocalPrintshop,
} from 'react-icons/md'

const steps = [
  { icon: <MdAirlineSeatReclineNormal size={26} />, number: '01', title: 'Select Seat',        description: 'Pick your preferred seat from the cabin map.'          },
  { icon: <MdOutlineRateReview size={26} />,        number: '02', title: 'Review Booking',     description: 'Confirm your flight details and passenger info.'       },
  { icon: <MdPayment size={26} />,                  number: '03', title: 'Payment',            description: 'Pay securely by card or mobile money.'                 },
  { icon: <MdMarkEmailRead size={26} />,            number: '04', title: 'Email Confirmation', description: 'Booking details sent straight to your inbox.'          },
  { icon: <MdSms size={26} />,                      number: '05', title: 'SMS Alert',          description: 'Instant text message sent to your phone.'             },
  { icon: <MdLocalPrintshop size={26} />,           number: '06', title: 'Print Receipt',      description: 'Download or print your boarding pass.'                },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const Booking = () => {
  return (
    <section className='pt-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#f7f8fa]'>

      {/* Header */}
      <motion.div
        className='mb-10'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className='text-2xl font-bold text-[#111]'>How Booking Works</h2>
        <p className='text-[#888] mt-1 text-sm'>Simple steps to secure your seat</p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.09 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: '0 14px 36px rgba(0,0,0,0.08)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='flex flex-col items-center text-center p-4 rounded-2xl border border-[#eaeaea] bg-white cursor-default'
          >
            <motion.div
              className='w-14 h-14 rounded-xl flex items-center justify-center mb-3'
              style={{ background: 'rgba(245,166,35,0.12)', color: '#d48b10' }}
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {step.icon}
            </motion.div>
            <span className='text-xs font-semibold text-[#bbb] mb-1'>{step.number}</span>
            <h3 className='text-sm font-semibold text-[#111] mb-1'>{step.title}</h3>
            <p className='text-xs text-[#888] leading-relaxed'>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  )
}

export default Booking