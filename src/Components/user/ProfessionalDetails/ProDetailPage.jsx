import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import createAxiosInstance from "../../../Axios/userAxios";
import proAxiosInstance from "../../../Axios/proAxios";
import ViewMap from "../../ReuseItems/ViewMap";
import { ClientLogout } from "../../../Redux/userState";
import ShowReviews from "../../ReuseItems/ShowReviews";
import ProGallery from "./ProGallery";
import Loader from "../../Loader/Loader";

function ProDetailPage({ email, id }) {
  const [date, setDate] = useState(new Date());
  const [prof, setProf] = useState("");
  const [Available, setAvailable] = useState(true);
  const [confirm, setCo] = useState("");
  const [existDate, setExistDate] = useState([]);
  const [selectdate, setSelectDate] = useState("");
  const [excixt, setExsit] = useState(0);
  const userAxios = createAxiosInstance();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Token = useSelector((state) => state.Client.Token);
  const userEmail = useSelector((state) => state.Client.email);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [review, setReview] = useState("");
  const [totalRating, setTotalRating] = useState("");

  const [showGallery, SetShowGallery] = useState(false);
  const [suspense, setSuspense] = useState(true);

  useEffect(() => {
    setSuspense(true);
    userAxios
      .get(`/proSingleDetails?proEmail=${email}&email=${userEmail}`)
      .then((res) => {
        if (res.data.message == "blocked") {
          toast.error("Account is blocked ");
          setTimeout(() => {
            dispatch(ClientLogout(""));
            navigate("/login");
          }, 300);
          return;
        }
        if (res.data.status == "success") {
          setProf(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSuspense(false);
      });
  }, []);

  useEffect(() => {
    userAxios
      .get(`/bookingExist?email=${email}`)
      .then((res) => {
        if (res.data.message == "blocked") {
          navigate("/login");
          return;
        } else if (res.data.message == "Authentication failed: invalid token.") {
          navigate("/login");
        }
        if (res.data.unSavedDates) {
          setExsit(1);
          setExistDate(res.data.unSavedDates);
        } else {
          toast.error(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }, []);

  useEffect(() => {
    userAxios
      .get(`/getReview?id=${id}`)
      .then((res) => {
        if (res.data.message == "success") {
          setReview(res.data);
          setTotalRating(res.data.totalRating);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDateClick = (date) => {
    setDate(date);
    setSelectDate(date);
  };

  const viewDay = () => {
    setCo(date);
  };

  useEffect(() => {
    if (existDate.includes(new Date().toISOString())) {
      setAvailable(false);
    }
  }, []);

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate());
  const prevDate = new Date(fiveDaysFromNow);
  prevDate.setDate(prevDate.getDate() + 5);

  const tileDisabled = (date) => {
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    const fiveDaysFromNow = new Date(prevDate);
    prevDate.setDate(fiveDaysFromNow.getDate() + 5);

    const currentDate = new Date(date);
    const currentDateStr = currentDate.toISOString();

    return (
      currentDateStr < fiveDaysFromNow.toISOString() ||
      currentDateStr > prevDate.toISOString() ||
      existDate.includes(currentDateStr)
    );
  };

  const tileClassName = ({ date }) => {
    if (tileDisabled(date)) {
      return "disabled-tile hover:bg-red-600 text-slate-400";
    }
    if (date.toDateString() === new Date().toDateString() - 1) {
      return "today-tile hover:bg-green-600 transition-colors";
    }
    if (
      selectdate !== "" &&
      selectdate.toDateString() === date.toDateString()
    ) {
      return "selected-tile bg-green-500 hover:bg-green-600 transition-colors";
    }
    return "hover:bg-green-600 transition-colors";
  };

  const proData = {
    profDetails: prof,
    bookingDate: selectdate,
  };
  const calendarContainerStyle = {
    backgroundColor: "#ffffff", // Background color for the calendar container
    borderRadius: "10px", // Rounded corners for the calendar container
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow for the calendar
  };

  const calendarTileStyle = ({ date }) => {
    if (tileDisabled(date)) {
      return "bg-red-600 text-slate-400";
    }
    if (date.toDateString() === new Date().toDateString()) {
      return "bg-green-600 text-white";
    }
    if (selectdate !== "" && selectdate.toDateString() === date.toDateString()) {
      return "bg-blue-500 text-white";
    }
    return "bg-green-600 text-white";
  };


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (positions) => {
          setUserLatitude(positions.coords.latitude);
          setUserLongitude(positions.coords.longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          toast.error("Please allow location permission");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {suspense ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-screen p-4 md:p-10 bg-gray-100">
          <div className="w-full min-h-screen max-w-screen-lg p-6 md:p-10 mx-auto relative rounded bg-white shadow-md">
            <p
              className={
                prof.status == "Active"
                  ? "text-green-300 font-semibold text-end"
                  : "text-red-600 font-semibold text-end"
              }
            >
              {prof ? (prof.status == "Active" ? "Available" : "On Work") : ""}
            </p>
            {showGallery && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 md:p-10 w-full max-w-4xl mx-auto rounded shadow-lg">
                  <ProGallery proId={id} fun={SetShowGallery} />
                </div>
              </div>
            )}
            <div className="border w-11/12 left-11 absolute top-16 border-gray-300"></div>
            <div className="flex flex-col md:flex-row md:gap-5 md:pt-10 relative">
              <div className="md:relative">
                <img
                  src={prof.image ? prof.image : "/profileimage.png"}
                  className="w-36 h-36 md:w-44 rounded-full md:h-44 md:left-16"
                  alt=""
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:w-2/3">
                <div className="md:w-1/2">
                  <h1 className="text-2xl md:text-4xl font-josefin-sans font-bold">
                    {prof.name ? prof.name : ""}
                  </h1>
                  <div className="mt-2 md:mt-4">
                    <p className="text-base font-josefin-sans md:text-lg">
                      Profession: {prof.work ? prof.work : ""}
                    </p>
                    <p className="text-base font-josefin-sans md:text-lg">
                      Vehicle Type: <br />
                      <span className="text-sm">
                        {" "}
                        {prof.types
                          ? prof.types.map((item) => item.name).join("  /")
                          : ""}
                      </span>
                    </p>
                    <div className="flex items-center">
                      <p className="text-base mt-1 font-josefin-sans md:text-lg">
                        Ranking:
                      </p>
                      <div className="cursor-pointer text-xs mt-2 md:mt-0 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 cursor-pointer ${
                              star <= totalRating
                                ? "text-yellow-400 "
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:w-1/3 mt-12">
                  <div className="flex items-center mb-2 md:mb-4">
                    <i class="fa-solid fa-location-dot text-blue-600 "></i>
                    <p className="ml-2 text-base font-josefin-sans md:text-lg">
                      {prof.location ? prof.location : ""}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i class="fa-regular fa-message"></i>
                    <p className="ml-2 text-base font-josefin-sans md:text-lg">
                      Available for Chat
                    </p>
                  </div>
                  <div className="flex items-center mt-4 ">
                    <button
                      onClick={() => SetShowGallery(true)}
                      className="ml-5 text-base bg-blue-600 hover:bg-blue-800 px-2 py-1 rounded text-white font-josefin-sans md:text-lg"
                    >
                      Show Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-11/12 mx-auto h-1 border-t-2 border-gray-300 mt-5" />
            <div className="flex flex-col md:flex-row items-center gap-6 md:justify-center">
              <div className="flex flex-col md:w-[50%] overflow-hidden mt-[3%] md:flex-row items-center gap-6 md:justify-center">
                <div className="pb-5  md:pb-0 md:mb-[20%] grid gap-2 md:ml-4">
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Service Details</p>
                    <div className="flex justify-between mt-2">
                      <span className="font-bold">Service Fee:</span>
                      <span className="text-green-500 font-bold">
                        ₹ {prof.fees ? prof.fees : ""}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-bold">Email:</span>
                      <span>{prof.email ? prof.email : ""}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-bold">Address:</span>
                      <span>{prof.address ? prof.address : ""}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-bold">Working Hours:</span>
                      <span>{prof.workingTime ? prof.workingTime : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block h-[15rem]  border border-gray-300"></div>
              <div className="w-full md:w-[28rem]">
                <div className="mx-auto my-5 flex flex-col items-center">
                <div className="h-[12rem] md:w-2/3 align-middle border rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-bg-[#793be4] to-blue-700 text-white">
  <div className="flex justify-center items-center h-full">
    <Calendar
      value={date}
      className="p-4 bg-blue-700 rounded-lg text-white" // Apply styles here
      tileClassName={tileClassName}
      onViewChange={viewDay}
      prev2Label=""
      next2Label=""
      minDate={fiveDaysFromNow}
      maxDate={prevDate}
      tileDisabled={({ date }) => {
        if (excixt == 1) {
          tileDisabled(date);
        } else {
          tileDisabled(date);
        }
      }}
      onClickDay={handleDateClick}
    />
  </div>
</div>

                  {!Token || prof.status !== "Active" ? (
                    <button
                      onClick={() =>
                        toast(
                          !Token
                            ? "Login for continue"
                            : "Not Available Current Now !"
                        )
                      }
                      className="mt-4 px-6 py-2 bg-blue-400 text-white rounded-lg shadow-md transition-colors transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/razorpay", { state: proData })}
                      className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <ViewMap
              email={email}
              userLongitude={userLongitude}
              userLatitude={userLatitude}
            />
            <h1 className="mt-8 md:mt-12 text-lg md:text-xl font-semibold">
              User's Reviews
            </h1>
            <div className="w-11/12 mx-auto border border-gray-300 mt-3" />
            <div className="w-11/12 h-[17rem]  mx-auto mt-3 bg-white">
              <ShowReviews review={review} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProDetailPage;
