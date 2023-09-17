import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosIns from '../../../Axios/proAxios'
import axiosInst from '../../../Axios/userAxios'
import { toast } from 'react-toastify';
function EditModal({fun}) {
  const [file, setFile] = useState("");
  const [proData,setProData]=useState("");
  const proemail = useSelector((store)=>store.Proffessional.email)
  const nameRef = useRef(null)
  const feeRef = useRef(null)
  const addressRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const proAxois = axiosIns()
  const userAxios = axiosInst()

  useEffect(()=>{
    userAxios.get(`/proSingleDetails?type=${'pro'}&proEmail=${proemail}`).then((res)=>{
        if(res.data.status=='success'){
          setProData(res.data.data)
        }
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const updateEditPro = async(e)=>{
    e.preventDefault()
    try {
      let time 
      const id = proData._id
       const starTime = startTimeRef.current.value;
       const endTime = endTimeRef.current.value;
       const name = nameRef.current.value;
       const fees = feeRef.current.value;
       const address = addressRef.current.value   

       if((startTimeRef.current.value === '' || endTimeRef.current.value === '') &&  nameRef.current.value==proData.name && feeRef.current.value ==proData.fees
       &&  addressRef.current.value===proData.address && file===''){
        toast.error('no changes applied')
        return
       }

       if( startTimeRef.current.value === '' || endTimeRef.current.value === ''){
         time = proData.workingTime
        }else{
          time = starTime + " am -" + " to - "  + endTime + " pm "
      }

     const res = await proAxois.patch('/updateEditPro',{time,name,fees,address,file,id},
      { headers: { "Content-Type": "multipart/form-data" } })
      if(res.data=='success'){
        toast.success(res.data)
        fun('hide')
      }else{
        console.log(error);
        toast.error(res.data)
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (

   <>
       <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
  <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
    <div className="p-4">
      <form action="">
        <div className="text-center text-xl font-semibold mb-4">
          Edit Profile
        </div>
        <div className="bg-blue-200 shadow-sm p-4 rounded-lg">
          <div className="text-center">
            <img
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : proData.image
                  ? proData.image
                  : '/profileimage.png'
              }
              className="w-[4rem] object-cover rounded-full h-[4rem] mx-auto"
              alt=""
            />
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-xs cursor-pointer mx-auto mt-2"
            />
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="font-bold">Name:</span>
              <input
                ref={nameRef}
                className="w-[7rem] text-sm"
                defaultValue={proData.name}
                type="text"
              />
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-bold">Service Fee:</span>
              <input
                ref={feeRef}
                className="w-[7rem] text-sm"
                defaultValue={proData.fees}
                type="number"
              />
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-bold">Address:</span>
              <input
                ref={addressRef}
                defaultValue={proData.address}
                className="w-[7rem] h-10 text-xs"
                type="text"
              />
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-bold">Working Hours:</span>
            </div>
            <div className="flex gap-1">
              <label htmlFor="">from:</label>
              <input ref={startTimeRef} type="time" className="text-sm" />
              <label htmlFor="">to:</label>
              <input ref={endTimeRef} type="time" className="text-sm" />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={updateEditPro}
              type="submit"
              className="bg-purple-700 hover:bg-black text-white rounded py-1 px-2"
            >
              Submit
            </button>
            <button
              onClick={() => fun('hide')} // Add this function to hide the modal
              type="button"
              className="bg-red-700 hover:bg-red-800 text-white rounded py-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div className="fixed inset-0 bg-black opacity-50 z-40"></div>

   </>
)}

export default EditModal