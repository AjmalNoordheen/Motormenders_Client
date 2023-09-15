import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAxiosInstance from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { Link, useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazyload';
import Bann from './Bann'
import Loader from '../../Loader/Loader'
import Contact from './Contact'

function UserHome() {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAxios = createAxiosInstance();
  const token = useSelector((state) => state.Client.Token);

  useEffect(() => {
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

  
  return (
    <>
  <hr />
    {isLoading?<div className='w-screen h-screen flex justify-center items-center'>
      <Loader/>
    </div>:(<div className='w-full h-fit bg-white'>
<div className='overflow-hidden  h-auto sm:h-[300px] md:h-[350px] lg:h-[450px] flex flex-col md:flex-row justify-around items-center'>
    <div className='mt-3 md:mt-0 -fit md:h-[22rem] ml-2 md:w-[45%] flex flex-col items-center justify-center '>
        <h1 className='text-black  text-2xl md:text-5xl md:text-center  font-bold  '>MOTOR MENDERS</h1>
        <p className='  text-xs md:text-base font-semibold  text-blue-800 text-center'>
        "Connect your Provider, Avail The Solutions."
        </p>
    </div>
    <div className='h-[10rem] sm:h-[22rem] w-full md:w-[52%]  bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url(homebanner.jpg)"}}></div>
</div>
<div className='w-full  bg-slate-100 flex items-center justify-center'>
<div  class='sm:w-[95%] lg:w-full  xl:w-[95%]   grid grid-cols-12 gap-x-1  lg:flex lg:items-center lg:place-items-center sm:justify-evenly   gap-y-1 md:gap-x-3 md:gap-y-2 bg-slate-100 pl-2 sm:pl-5 pr-3 sm:pr-5 py-5'>
  <Bann/>     
</div>
</div>
{/* <Carousel/> */}
<div  className='overflow-hidden md:gap-5 bg-white w-full md:grid grid-cols-12 border-t'>
    <div className='mt-2 sm:mt-0 md:h-[23rem] justify-center  flex flex-col col-span-7 md:col-span-6'>
        <h1 className='text-black sm:pb-4 md:pb-0 text-sm md:text-xl md:text-center sm:pt-4 font-bold  md:pt-8'>Convenient and Coefficient Services</h1>
        <p className='text-black lg:mt-4 text-xs md:text-sm font-semibold  sm:pb-4 md:pb-8 text-center '>
          quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
        </p>
    </div>
    <div className='h-[15rem] md:h-[23rem]  md:w-full md:col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url(car1.png)"}}></div>
</div>


<div class='bg-slate-200 w-full sm:h-[18rem] flex justify-center items-center'>
  <div class='bg-white w-full gap-1 rounded-md lg:w-11/12 h-4/6 md:h-full lg:h-4/6 flex flex-col items-center justify-center'>
    <h1 class='font-bold text-2xl sm:text-3xl pb-2 md:text-4xl'>How It Works</h1>
    <div class='flex flex-wrap items-center justify-around w-full gap-4 sm:gap-8 md:gap-12'>
      <div class='flex flex-col items-center justify-center ml-2'>
        <img src="/pic.png" class='h-20 w-20 md:h-26 md:w-26 rounded-full border border-black' alt="" />
        <p>Register</p>
      </div>
      <div class='flex flex-col items-center justify-center'>
        <img src="/loc.png" class='h-20 w-20 md:h-26 md:w-26 rounded-full border border-black' alt="" />
        <p>Search location</p>
      </div>
      <div class='flex flex-col items-center justify-center'>
        <img src="/mec.png" class='h-20 w-20 md:h-26 md:w-26 rounded-full border border-black' alt="" />
        <p>Select provider</p>
      </div>
      <div class='flex flex-col items-center justify-center'>
        <img src="/book.png" class='h-20 w-20 md:h-26 md:w-26 rounded-full border border-black' alt="" />
        <p>Book Appointment</p>
      </div>
      <div class='flex flex-col items-center justify-center'>
        <img src="/ser.png" class='h-20 w-20 md:h-26 md:w-26 rounded-full border border-black' alt="" />
        <p>Avail the Service</p>
      </div>
    </div>
  </div>
</div>


{/* <Contact/> */}
 

</div>)}


    </>
  )
}

export default React.memo(UserHome); // Optimize by using React.memo