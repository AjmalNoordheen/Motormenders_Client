import React, { useEffect, useRef, useState } from "react";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../Firebase/Firebases.config";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "../../../Axios/userAxios";

function OtpSignUp({ name, email, mobile, password, location, fun }) {
  const [clicked, setClicked] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [resend, setResend] = useState(false);
  const navigate = useNavigate();
  const userAxios = createAxiosInstance();

  const checkMob = () => {
    setClicked(true);
    setResend(false);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNo = "+91" + mobile.trim();
    signInWithPhoneNumber(auth, phoneNo, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success("OTP send");
        setClicked(false);

      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.errMsg) {
          toast.error(error?.response?.data?.errMsg);
          console.log(error);
        }
      });
  };

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            checkMob();
          },
          "expired-callback": () => {
            console.log("expired callback");
          },
        },auth
      );
    }
  }

  function otpVerify() {
    setClicked(true);
    window.confirmationResult.confirm(otp).then((res) => {
      toast.success("otp successfullly validated")
      userAxios
        .post("/signUp", {
          name,
          email,
          mobile,
          password,
          location,
        })
        .then((res) => {
          if (res.data.status) {
            navigate("/login");
            fun(false);
          } else {
            navigate("/signup");
            fun(false);
          }
        })
        .catch((err) => {
          setClicked(false);
          console.log(err);
        });
    });
  }

  const [seconds, setSeconds] = useState(60);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if (showOTP) {
      setSeconds(60);
      if (seconds > 0) {
        const decrementSeconds = () => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        };
        countdownIntervalRef.current = setInterval(decrementSeconds, 1000);
      }

      return () => clearInterval(countdownIntervalRef.current);
    }
  }, [resend, showOTP]);

  useEffect(() => {
    if (seconds <= 0) {
      setResend(true);
      clearInterval(countdownIntervalRef.current);
    }
  }, [seconds]);

  return (
    <div
      style={{ height: "100vh" }}
      className="bg-gray-800 flex justify-center items-center"
    >
      <div id="recaptcha-container"></div>
      <div className=" bg-green-900 p-5 rounded">
        <Toaster toastOptions={3000} />
        <div className="bg-white text-emarald-500 w-fit mx-auto p-4 rounded-full">
          <BsFillShieldLockFill size={30} />
        </div>
        {showOTP ? (
          <h1 className="text-white font-bold text-center mt-2">
            Enter Your OTP
          </h1>
        ) : (
          <h1 className="text-white font-bold text-center mt-2">
            Enter Your Mobile
          </h1>
        )}
        <div className="p-5">
          {showOTP ? (
            <OtpInput
              className="ms-3"
              OTPLength={6}
              value={otp}
              onChange={setOtp}
              otpType="number"
              disabled={false}
              autoFocus
              key={"otp-input"}
            />
          ) : (
            <input
              type="text"
              value={mobile}
              key={"mobile-input"}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone"
              limit={10}
            />
          )}
          {showOTP && (
            <div className="flex justify-center">
              <span className="text-center text-white">{seconds}</span>
            </div>
          )}
          {!showOTP ? (
            <button
              className="text-white mt-3 bg-black w-full flex gap-1 items-center justify-center py-2.5 rounded"
              onClick={checkMob}
            >
              {clicked ? <CgSpinner size={20} className="animate-spin" /> : ""}
              <span>Send Otp</span>
            </button>
          ) : resend ? (
            <button
              className="text-white mt-3
            bg-green-800 w-full flex gap-1 items-center justify-center py-2.5 rounded"
              onClick={checkMob}
            >
              {clicked ? <CgSpinner size={20} className="animate-spin" /> : ""}
              <span>Resend Otp</span>
            </button>
          ) : (
            <button
              className="text-white mt-3 bg-green-800 w-full flex gap-1 items-center justify-center py-2.5 
            rounded"
              onClick={otpVerify}
            >
              {clicked ? <CgSpinner size={20} className="animate-spin" /> : ""}
              <span>Verify OTP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpSignUp;
