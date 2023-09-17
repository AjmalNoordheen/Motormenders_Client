import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import proAxiosInstance from '../../../Axios/proAxios'
import EditModal from "./EditModal";
import { ProfessionalLogout } from "../../../Redux/ProState";
import ProGallery from "./ProGallery";


function ProProfile() {
  const [prof,setProf]  = useState('')
  const proAxios = proAxiosInstance()
  const dispatch = useDispatch()
  const [modal,setModal] = useState('hide')
  const [status,setStatus] = useState('')
  const [count,setCount] = useState(true)
  const navigate  = useNavigate()
  const proData = useSelector((state)=>state.Proffessional.proData)
  useEffect(()=>{
     proAxios.get(`/proProfile?proId=${proData._id}`).then((res)=>{
      if(res.data.message=='blocked'){
        toast.error('Account is blocked ')
        setTimeout(() => {
          dispatch(ProfessionalLogout(''))
          navigate('/proffesional/login')
        }, 300);
        return
      }
      if(res.data.status===false )  {
         setTimeout(() => {
          dispatch(ProfessionalLogout(''))
          navigate('/proffesional/login')
        }, 300);
      }
      if(res.status==200){
          setProf(res.data)
        }
    }).catch((err)=>{
      console.log(err);
    })
  },[modal,status,count])

  const changeAvailability = async(type,id)=>{
    if(type=='onwork'){
      setCount(true)
    }else{
      setCount(false)
    }
    const res =await proAxios.post('/changeAvailability',{type,id})
    if(res.data){
      setStatus(res.data)
    }else{
      console.log(error)
    }
  
  }
  console.log(status)
  return (
    <>
       <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-screen-lg mx-auto p-6 md:p-10 bg-white shadow-md rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={() => setModal('show')}
            className="px-4 py-2 mb-2 text-white bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none"
          >
            Edit Profile
          </button>
        </div>
        <div className="border-b border-gray-300 mb-6 pb-6">
          <div className="md:flex md:items-center md:space-x-6">
            <img
              src={prof.image ? prof.image : '/profileimage.png'}
              alt="Profile"
              className="w-32 h-32 md:w-44 md:h-44 rounded-full"
            />
            <div className="mt-4 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-semibold">
                {prof.name ? prof.name : ''}
              </h1>
              <p className="mt-2 text-lg font-medium text-gray-600">
                Profession: {prof.work ? prof.work : ''}
              </p>
              <div className="mt-2">
                {prof.status === 'Active' ? (
                  <button
                    onClick={() => changeAvailability('onwork', prof?._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Not Available
                  </button>
                ) : (
                  <button
                    onClick={() => changeAvailability('Active', prof?._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 overflow-scroll md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Service Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold">Service Fee:</span>
                <span className="text-green-500 font-semibold">
                  ₹ {prof.fees ? prof.fees : ''}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Email:</span>
                <span>{prof.email ? prof.email : ''}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Address:</span>
                <span>{prof.address ? prof.address : ''}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Working Hours:</span>
                <span>{prof.workingTime ? prof.workingTime : ''}</span>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Location & Vehicle Type</h2>
            <div className="flex items-center">
              <img
                src="/footer/Cardmap.png"
                alt="Location"
                className="w-6 h-6 mr-2"
              />
              <span className="text-lg font-medium">
                {prof.location ? prof.location : ''}
              </span>
            </div>
            <div className="mt-3 flex">
              <img
                src="/footer/spanner1.png"
                alt="Vehicle Type"
                className="w-6 h-6 mr-2"
              />
              <span className="text-lg font-medium">
                Vehicle Type: {prof.types ? prof.types.map((item) => item.name).join(' / ') : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      {modal === 'show' ? <EditModal fun={setModal} /> : ''}
      <hr className="my-8 border-t border-gray-300" />
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        GALLERY
        </h2>
        <ProGallery />
      </div>
    </div>
    </>
  );
}

export default ProProfile;
