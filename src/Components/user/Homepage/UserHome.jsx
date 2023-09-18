import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAxiosInstance from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import Card from './Card'

function UserHome() {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAxios = createAxiosInstance();
  const token = useSelector((state) => state.Client.Token);

  useEffect(() => {
    setIsLoading(false);

      if (token) {
      userAxios
        .get(`/getDetails`)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === false) {
            dispatch(ClientLogout());
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
        }).finally(()=>{
          setIsLoading(false);
        })
    }
  }, [token]);

  const steps = [
    {
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgY2WJcq5Kc6dBwxsOG1d0ThNAuBifIMt7rbSMEGCaDp7TdA2_Hgw5cXLQT9cCnirO4X4&usqp=CAU',
      text: 'Register',
    },
    {
      icon: '/loc.png',
      text: 'Search location',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/6833/6833589.png',
      text: 'Select provider',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/4473/4473658.png',
      text: 'Book Appointment',
    },
    {
      icon: 'https://www.freeiconspng.com/thumbs/services-icon-png/customer-support-icon-png-28.png',
      text: 'Avail the Service',
    },
  ];
  return (
    <>
  <hr />
    {isLoading?<div className='w-screen h-screen flex justify-center items-center'>
      <Loader/>
    </div>:(<div className='w-full h-fit bg-white'>
<div className='overflow-hidden  h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex flex-col md:flex-row justify-around items-center'>
    <div className='mt-3 md:mt-0 -fit md:h-[22rem] ml-2 md:w-[45%] flex flex-col items-center justify-center '>
        <h1 className='text-black  text-4xl sm:text-5xl md:text-center  font-bold  '>MOTOR MENDERS</h1>
        <p className='  text-sm md:text-base font-semibold  text-blue-800 text-center'>
        "Connect your Provider, Avail The Solutions."
        </p>
    </div>
    <div className='h-[18rem] sm:h-[22rem] w-full md:w-[52%]   bg-no-repeat bg-contain bg-center' style={{backgroundImage: "url(homebanner.jpg)"}}></div>
</div>
 <div className='mt-5 sm:mt-0 bg-slate-100 sm:bg-white pt-3 md:pt-0'>
 <Card/>
 </div>
<div  className='overflow-hidden md:gap-5 bg-white w-full md:grid grid-cols-12'>
    <div className='mt-2 sm:mt-0 md:h-[23rem] justify-center items-center w-full  flex flex-col col-span-7 md:col-span-6'>
        <h1 className='text-black  text-2xl md:text-5xl md:text-center  font-bold '>Convenient Services</h1>
        <p className='text-black lg:mt-4 text-xs md:text-sm font-semibold  sm:pb-4 md:pb-8 text-center '>
        "Keeping you safe on the road, one repair at a time."        </p>
    </div>
    <div className='h-[15rem] md:h-[23rem]  md:w-full md:col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url(car1.png)"}}></div>
</div>


<div className="bg-white py-12">
  <div className="container mx-auto bg-slate-100 rounded-lg p-4 ">
    <h1 className="text-2xl font-semibold mb-8 text-center">How It Works</h1>
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center items-center">
      {steps.map((step, index) => (
        <div className="flex flex-col col-span-1 items-center text-center relative" key={index}>
          <img
            src={step.icon}
            loading="lazy"
            className="h-20 w-20 md:h-24 md:w-24 rounded-full border border-gray-400 transition-transform transform hover:scale-105"
            alt={step.text}
          />
          <p className="text-lg font-semibold mt-4">{step.text}</p>
        </div>
      ))}
    </div>
  </div>
</div>


 <div className='bg-white py-12'>
            <div className='container mx-auto text-center'>
              <h1 className='text-4xl font-extrabold mb-8'>Welcome to Motor Menders</h1>
              <p className='text-xl text-gray-800'>
                We are here to provide you with the best automotive services. Explore our website to find trusted
                mechanics and book your appointments hassle-free.
              </p>
              <Link to='/prolists' className='mt-6 text-blue-600 hover:underline'>
                View Our Service Providers
              </Link>
            </div>
          </div>


 

</div>)}


    </>
  )
}

export default React.memo(UserHome); // Optimize by using React.memo