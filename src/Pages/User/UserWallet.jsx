import React from 'react'
import Wallet from '../../Components/ReuseItems/Wallet'
import Navbar from '../../Components/user/Navbar/Navbar'
import Footer from '../../Components/user/Footer/Footer'

function UserWallet() {
  return (
   <>
  <div className='bg-blue-700'>
  <Navbar data={1}/>
  </div>
   <Wallet/>
   <Footer/>
   </>
  )
}

export default UserWallet