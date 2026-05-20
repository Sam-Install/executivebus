import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'
import BusSeats from './pages/BusSeats'
import Footer from './components/Footer'
import CreateAccount from './pages/CreateAccount'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Confirm from './pages/Confirm'
import Gallery from './pages/Gallery'
import Parcel from './pages/Parcel'

const App = () => {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateAccount />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/buses/seats' element={<BusSeats />} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/booking/confirm' element={<Confirm/>} />
        <Route path='/track' element={<Parcel/>} />
      </Routes>

      <Toaster position='top-right' richColors />

      <Footer />

    </div>
  )
}

export default App