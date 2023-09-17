import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {/* Card 1 */}
        <Link to={`/prolists?type=${'workshop'}`}>
        <div className="relative card py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
          <div
            style={{
              backgroundImage:
                "url(https://cdn-icons-png.flaticon.com/512/5044/5044767.png)",
              backgroundSize: "cover",
            }}
            className=" text-white flex items-center bg-black absolute rounded-full py-4 px-4 shadow-xl left-4 -top-6"
          >
            <p className="h-8 w-8" />
          </div>
          <div className="mt-8 ">
            <p className="text-xl font-semibold my-2">Book WorkShop</p>
            <div className="flex space-x-2 text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>Service Near You</p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-sm my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>Book The Service</p>
            </div>
            <div className="border-t-2"></div>
            <div className="flex items-end">
              <p className="text-gray-400 text-sm ">
                Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                Searching For the Services
              </p>
              <Link to={`/prolists?type=${'workshop'}`}>
                <i className="fa-solid text-sm mt-[10%] text-orange-500 fa-circle-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
        </Link>
        {/* Card 2 */}

        <Link to={'/proffesional/signup'}>
        <div className="relative card bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
          <div
            style={{
              backgroundImage: "url(Shipping.png)",
              backgroundSize: "cover",
            }}
            className=" text-white  flex items-center absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6"
          >
            <p className="h-8 w-8" />
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold my-2">Register WorkShop</p>
            <div className="flex space-x-2 text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>Provide Your Best Services</p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-sm my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>Connect with people.</p>
            </div>
            <div className="border-t-2 "></div>
            <div className="flex items-end">
              <p className="text-gray-400 text-sm ">
                Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                Searching For the Services
              </p>
              <Link to={'/proffesional/signup'}>
                <i className="fa-solid text-sm mt-[10%] text-orange-600 fa-circle-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
        </Link>

        {/* Card 3 */}
        <Link to={'/prolists'}>
        <div className="relative card bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
          <div
            style={{
              backgroundImage:
                "url(https://icon-library.com/images/repair-icon-png/repair-icon-png-7.jpg)",
              backgroundSize: "cover",
            }}
            className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6"
          >
            <p className="h-8 w-8" />
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold my-2">Connect Mechanic</p>
            <div className="flex space-x-2 text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>Find an Individual Mechanic.</p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-sm my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>Filter and Book the Best One</p>
            </div>
            <div className="border-t-2 "></div>
            <div>
              <div className="flex items-end">
                <p className="text-gray-400 text-sm ">
                  Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                  Searching For the Services
                </p>
                <Link to={'/prolists'}>
                  <i className="fa-solid text-sm mt-[10%] text-blue-600 fa-circle-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Link>


        {/* Card 4 */}
        <Link to={'/proffesional/signup'}>
        <div className="relative card bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
          <div
            style={{
              backgroundImage:
                "url(https://cdn-icons-png.flaticon.com/256/4515/4515019.png)",
              backgroundSize: "cover",
            }}
            className=" text-white bg-black flex items-center absolute rounded-full py-4 px-4 shadow-xl  left-4 -top-6"
          >
            <p className="h-8 w-8" />
          </div>
          <div className="mt-8">
            <p className="text-xl font-semibold my-2">Register Freelancer</p>
            <div className="flex space-x-2 text-gray-400 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p>Provide Your Skills</p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-sm my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>Connect with Clients.</p>
            </div>
            <div className="border-t-2 "></div>
            <div>
              <div className="flex items-end">
                <p className="text-gray-400 text-sm ">
                  Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                  Searching For the Services
                </p>
                <Link to={'/proffesional/signup'}>
                  <i className="fa-solid text-sm mt-[10%] text-orange-600 fa-circle-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}
