import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import createAxiosInstance from '../../Axios/userAxios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../user/Navbar/Navbar'
import { useNavigate } from "react-router-dom";
function UserEdit({ setShow}) {
  const [user, setUser] = useState('');
  const [file, setFile] = useState('');
  const [loader, setloader] = useState(false);

  console.log(file);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const navigate = useNavigate()
  const email = useSelector((store) => store.Client.email);
  const token = useSelector((store) => store.Client.Token);
  const img=useRef()
  const userAxios = createAxiosInstance()
  useEffect(() => {
     userAxios
      .get(`/getUserProfile?email=${email}`
      )
      .then((res) => {
        if(res.data.message=='blocked'){
          toast.error('Account is blocked ')
          setTimeout(() => {
            navigate('/login')
          }, 300);
          return
        }
        if (res.status == 200) {
          setUser(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };

  async function EditDetails(e) {
    try {
      e.preventDefault();
      const name = nameRef.current.value.trim();
      const phone = phoneRef.current.value.trim();
      const location = locationRef.current.value.trim();
        if (
          name == user.name &&
          phone == user.phone &&
          location == user.location&&
          file==''
        ) {
          showErrorMessage("no changes applied");
        } else if (name == "" || phone == "" || location == "") {
          showErrorMessage("fill all the feilds");
        }else if(phone.length!=10){
          showErrorMessage("number must contain 10 ");
        } else {
          setloader(true)
         const res =await userAxios.patch(`/editUser?email=${email}`,{email,name,phone,location,file},
         {headers : {'Content-Type': 'multipart/form-data'}}
         )
         if(res.data.message=='blocked'){
          toast.error('Account is blocked ')
          setTimeout(() => {
            navigate('/login')
          }, 300);
          return
        }
         if(res.status==200){
           showToastMessage() 
           setShow('hide')
         }else{
          showErrorMessage(error)
         }
        }
    } catch (error) {
      showErrorMessage(error)
    }
  }
  return (
    <>
 <div className="min-h-screen w-full bg-slate-300 flex justify-center">
        <div className="mt-5 mb-5 w-full max-w-4xl bg-slate-100 rounded-lg overflow-hidden">
          <div className="w-full bg-gradient-to-r from-blue-700 to-blue-600">
            <NavBar data={1} />
          </div>
          <div className="w-full p-4 md:p-8">
            <div className="flex flex-col justify-center items-center">
              <div className="md:w-1/3 text-center mb-4 md:mb-0">
                <div className="relative inline-block">
                  <img
                    src={file instanceof File ? URL.createObjectURL(file) : user.image ? user.image : "/profileimage.png"}
                    onClick={() => img.current.click()}
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full cursor-pointer"
                  />
                  <input type="file" className="hidden" accept="image/*" ref={img} name="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <h1 className="mt-2 text-xl font-bold">{user ? user.name : ''}</h1>
                <h3 className="text-gray-500 text-sm">{user ? user.email : ''}</h3>
              </div>
              <div className="md:w-2/3">
                <form onSubmit={EditDetails} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
                      <input
                        defaultValue={user ? user.name : ''}
                        type="text"
                        ref={nameRef}
                        name="username"
                        required
                        className="w-full px-4 py-2 rounded-lg border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold">Mobile:</label>
                      <input
                        defaultValue={user ? user.phone : ''}
                        type="number"
                        placeholder=""
                        ref={phoneRef}
                        required
                        className="w-full px-4 py-2 rounded-lg border"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-semibold">Location:</label>
                      <input
                        defaultValue={user ? user.location : ''}
                        type="text"
                        ref={locationRef}
                        required
                        className="w-full px-4 py-2 rounded-lg border"
                      />
                    </div>
                  </div>
                  {loader ? (
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-600 py-2 px-4 rounded text-white">
                      <i className="fa-solid fa-circle-notch text-white animate-spin"></i>
                    </button>
                  ) : (
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-600 py-2 px-4 rounded text-white">
                      Submit
                    </button>
                  )}
                </form>
              </div>
                  <span className=" bg-gradient-to-r mt-2 cursor-pointer  from-blue-700 to-blue-600 py-2  px-4 rounded text-white" onClick={() => setShow('hide')}>Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserEdit;
