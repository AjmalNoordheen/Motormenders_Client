import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import UserEdit from "../../ReuseItems/UserEdit";
import userAxiosInstance from "../../../Axios/userAxios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

function UserProfile() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState("hide");
  const email = useSelector((store) => store.Client.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAxios = userAxiosInstance();
  const [suspense, setSuspense] = useState(true);


  useEffect(() => {
    userAxios
      .get(`/getUserProfile?email=${email}`)
      .then((res) => {
        if (res.data.message === "blocked") {
          toast.error("Account has been blocked");
          dispatch(ClientLogout());
          setTimeout(() => {
            navigate("/login");
          }, 300);
          return;
        }
        if (res.status === 200) {
          setUser(res.data.user);
          setSuspense(false)
        } else if (res.data.status === false) {
          dispatch(ClientLogout());
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/serverError')

      });
  }, [email, show]);

  return (
    <>
    {show=='show'?<UserEdit setShow={setShow}/>:(<div className="min-h-screen w-full bg-slate-300 flex justify-center">
        <div className="mt-5 mb-5 w-full max-w-4xl bg-slate-100 rounded-lg overflow-hidden">
          <div className="w-full bg-gradient-to-r from-blue-700 to-blue-600">
            <NavBar />
          </div>
          <div className="w-full p-4 md:p-8">
            <div className="flex flex-col justify-center items-center">
          {suspense?
          <div className="flex w-screen h-screen justify-center items-center">
          <Loader/>
          </div>:(<>
              <div className="md:w-1/3 text-center mb-4 md:mb-0">
                <div className="relative inline-block">
                  <img
                    src={user?.image || "/profileimage.png"}
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full cursor-pointer"
                  />
                </div>
                <h1 className="mt-2 text-xl font-bold">{user?.name || ""}</h1>
                <h3 className="text-gray-500 text-sm">{user?.email || ""}</h3>
              </div>
              <div className="md:w-2/3">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold">
                        Name:
                      </label>
                      <input
                        value={user?.name || ""}
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold">
                        Email:
                      </label>
                      <input
                        value={user?.email || ""}
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border"
                      />
                    </div>
                    {user?.phone && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold">
                          Mobile:
                        </label>
                        <input
                          value={user?.phone || ""}
                          type="number"
                          placeholder=""
                          className="w-full px-4 py-2 rounded-lg border"
                        />
                      </div>
                    )}
                    {user?.location && (
                      <div>
                        <label htmlFor="location" className="block text-sm font-semibold">
                          Location:
                        </label>
                        <input
                          value={user?.location || ""}
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border"
                        />
                      </div>
                    )}
                    {user?.status && (
                      <div>
                        <label htmlFor="status" className="block text-sm font-semibold">
                          Status:
                        </label>
                        <input
                          value={user?.status || ""}
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 text-center">
                    <button
                      type="button"
                      onClick={() => setShow("show")}
                      className="px-4 py-2 rounded text-white bg-gradient-to-r from-blue-700 to-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
          </>)}
            </div>
          </div>
        </div>
      </div>)}
      
    </>
  );
}

export default UserProfile;
