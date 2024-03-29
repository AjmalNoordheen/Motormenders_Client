import React from 'react'
import NavBar from '../../Components/user/Navbar/Navbar'
import Bookings from '../../Components/user/Bookings/Bookings'
import { useState } from 'react'
import Footer from '../../Components/user/Footer/Footer'
function UsersBooking() {
    const [height,setHeight] =useState(0)
  return (
      <>
    <div className="w-full h-fit bg-blue-700">
    <NavBar  data={1} />
    </div>

    <div className={height==1?'mt-[45%]':'h-auto'}>
    <Bookings/>
    </div>
    <Footer/>
   </>
  )
}

export default UsersBooking