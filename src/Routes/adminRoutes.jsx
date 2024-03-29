import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../Pages/Admin/Login'
import DashBoard from '../Pages/Admin/DashBoard'
import ListtypesPage from '../Pages/Admin/ListTypes'
import ProView from '../Pages/Admin/WorkShop'
import FreelancerView from '../Pages/Admin/FreelancerView'
import { useSelector } from 'react-redux'
import WithdrawRequest from '../Pages/Admin/WithdrawRequest'
import Errorpage from '../Components/ReuseItems/Errorpage'

function AdminRoutes() {
  const token = useSelector((store)=>store.Admin.Token)
  return (
    <>
    <Routes>
    <Route path='/login' element={token?<Navigate to={'/admin/dashbord'}/>:<Login/>}/>
    <Route path='/dashbord' element={token?<DashBoard/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/workshop' element={token?<ProView/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/freelancer' element={token?<FreelancerView/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/listtypes' element={token?<ListtypesPage/>:<Navigate to={'/admin/login'}/>}/>
    <Route path="/withdrawreq" element={<WithdrawRequest/>} />
    <Route path='/*' element={<Errorpage/>}/>

    </Routes>
    </>
  )
}

export default AdminRoutes