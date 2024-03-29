import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Chats from "../../ReuseItems/Chat/ChatArea";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import ProfessionalAxios from "../../../Axios/proAxios";
import AdminAxiosInstance from "../../../Axios/AdminAxios";
import Footer from "../Footer/Footer";

function ProfessionalList() {
  const [isLoading, setIsLoading] = useState(true);
  const [pros, SetPros] = useState([]);
  const [types, SetTypes] = useState([]);
  const [load, setLoad] = useState(1);
  const [searchInput, SetSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [show, setShow] = useState(1);
  const [suspense, setSuspense] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const token = useSelector((store) => store.Client.Token);

  const ProAxios = ProfessionalAxios();
  const AdminAxios = AdminAxiosInstance();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        if (type === "workshop") {
          res = await ProAxios.get(`/getFreelancer?type=${type}`);
          setLoad(load + 1);
        } else {
          res = await ProAxios.get("/getFreelancer");
          setLoad(load - 1);
        }
        if (res.data.pro) {
          setSuspense(false);
          SetPros(res.data.pro);
        } else {
          setSuspense(false);
          console.log("No Freelancer data available.");
        }
        const response = await AdminAxios.get("/listTypes");
        if (response.data.list) {
          SetTypes(response.data.list);
        } else {
          console.log("no types available");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // navigate('/serverError')

      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [type]);

  const ProDetailPage = (Proemail, proId) => {
    try {
      navigate("/proDetails", { state: { Proemail, proId: proId } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const filteredPros = pros.filter((pro) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return pro.types.some((type) => selectedCategories.includes(type._id));
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPros.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {show != 1 ? (
        <Chats fun={setShow} pro={show} />
      ) : (
        <>
          <div className="w-full bg-[#1e51db]">
            <NavBar data={1} />
          </div>
          {suspense ? (
            <div className="flex w-screen h-screen justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full h-full bg-slate-200">
              <div className="sm:flex justify-center">
                <div className="sm:flex sm:relative top-[4.5rem] left-14">
                  <p className="text-black font-gravitas-one text-xl pt-2 sm:pt-0 text-center font-semibold sm:text-3xl">
                    Freelance <br /> Mechanics
                  </p>
                </div>
                <img
                  src="freelance.png"
                  className="hidden sm:block w-36 drop-shadow-2xl"
                  alt=""
                />
                <div className="rounded w-full sm:w-auto flex overflow-x-hidden">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => SetSearchInput(e.target.value)}
                    className="sm:mt-[7rem] px-3 m-auto rounded"
                    placeholder="search your location"
                  />
                </div>
              </div>
              <div className="w-full h-full flex flex-col sm:flex-row justify-evenly">
                <div className="w-full sm:w-2/12 border">
                  <h1 className="text-black text-xl font-bold font-jockey-one">
                    Categories
                  </h1>
                  <hr className="border-black" />
                  <div className="flex-col m-4 h-full">
                    <input type="checkbox" className="" />
                    <label htmlFor="" className="text-black ml-3">
                      All
                    </label>
                    <br />
                    {types.map((item) => (
                      <React.Fragment key={item._id}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(item._id)}
                          onChange={() => handleCategoryToggle(item._id)}
                        />
                        <label
                          htmlFor=""
                          className="text-black ml-3"
                          key={item._id}
                        >
                          {item.name}
                        </label>
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="w-full sm:w-9/12 min-h-screen h-full rounded-lg border border-slate-300 overflow-scroll p-3 pb-2 flex flex-col items-center sm:items-baseline sm:grid sm:grid-cols-12 gap-x-3 bg-white">
                  {currentItems
                    .filter((data) =>
                      data.location
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                    .map((items) => (
                      <div key={items._id} className="h-[18rem] mx-4 sm:mx-0 overflow-auto shadow-xl transform transition-transform hover:scale-10 w-[80%] sm:w-[98%] col-span-6 relative lg:col-span-4 xl:col-span-3 m-2 bg-slate-100 rounded-[15px] border border-slate-300 order-opacity-90">
                        <div className="h-[.01rem] w-full bg-slate-300 absolute mt-11 z-0"></div>
                        <div className="flex items-center">
                          <div className="rounded-full w-full flex justify-between z-10 mx-1 my-1">
                            <img
                              loading="lazy"
                              src={items.image ? items.image : "/profileimage.png"}
                              className="rounded-full object-cover w-20 h-20 border-2"
                              alt=""
                            />
                            <div className="flex w-4/5 justify-center place-items-center mb-5">
                            <p className={items?.status=='Active'?'text-green-500 font-Shrikand text-end':'text-red-600 font-semibold text-end'}>{items?items.status=='Active'?'Available Now':'On Work':""}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <h1 className="font-jockey-one font-bold text-xl  ml-2 text-black">
                            {items.name}
                          </h1>
                          <img
                            className="h-[1.5rem]"
                            src="/footer/tick.png"
                            alt="img"
                          />
                        </div>
                        <div className="mx-2 my-3">
                          <div className="flex gap-2 items-end sm:gap-[.3rem]">
                            <img
                              className="h-[1.5rem] "
                              src="/footer/email.png"
                              alt="img"
                            />
                            <h2 className="font-josefin-sans mt-2 text-lg  sm:text-sm text-black">
                              {items.email}
                            </h2>
                          </div>
                          <div className="flex mt-2 items-end gap-2 sm:gap-[.3rem]">
                            <img
                              className="h-[1.5rem] "
                              src="/footer/Cardmap.png"
                              alt="img"
                            />
                            <h2 className="font-josefin-sans text-base  sm:text-sm  whitespace-nowrap overflow-hidden text-black">
                              {items.location}
                            </h2>
                          </div>
                          <div className="flex mt-1 items-end gap-2 sm:gap-[.3rem]">
                            <img
                              className="h-[1.5rem] mt-2"
                              src="/footer/spanner1.png"
                              alt="img"
                            />
                            <select
                              className="font-josefin-sans cursor-pointer mt-3 bg-slate-100 text-base sm:text-xs text-black border-none p-1 focus:outline-none"
                            >
                              <option value="">specialized in</option>
                              {items.types.map((item) => (
                                <option key={item._id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <button
                            type="button"
                            onClick={() =>
                              ProDetailPage(items.email, items._id)
                            }
                            className="text-sm text-white px-1  sm:p-2 rounded bg-[#552a9e] hover:bg-[#9661f1] hover:text-black"
                          >
                            More Details
                          </button>
                          {token ? (
                            <button
                              onClick={()=>
                              navigate(`/userchat?pro=${items._id}`)}
                              className="text-white bg-[#552a9e] px-1 sm:p-1.5 rounded hover:bg-[#9661f1] hover:text-black"
                            >
                              <i className="fa-solid fa-message "></i> Chat
                            </button>
                          ) : (
                            <button
                              onClick={() => toast("Login for Continue")}
                              className="text-white bg-[#552a9e] px-1 sm:p-1.5 rounded hover:bg-[#9661f1] hover:text-black"
                            >
                              <i className="fa-solid fa-message "></i> Chat
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="w-full flex justify-center items-center">
                {Array.from(
                  { length: Math.ceil(filteredPros.length / itemsPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 mt-2 mr-2 bg-gray-200 hover:bg-red-400 rounded-full ${
                        currentPage === i + 1 ? "bg-red-500 text-white" : ""
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>

              <div className="w-full sm:pr-9 pt-4 sm:pb-8 flex justify-end">
                <div className="bg-[url('/looking-for-a-car-mechanic-near-me-1170x349.jpg')] flex flex-col items-end  bg-origin-content bg-repeat-round h-[20rem] w-[64rem]">
                  <h1 className="text-yellow-400 lg:mt-[17%] mr-2  text-4xl font-josefin-sans italic font-bold">
                    Register as Mechanic
                  </h1>
                  <p className="text-slate-300 text-bold m-2 w-1/2 text-sm">
                  Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                  Searching For the Services.Connect and Book to Your Nearest Work-Shop. Don't Lose Your Time
                  Searching For the Services
                  </p>
                </div>
              </div>
            </div>
          )}
          <Footer/>
        </>
      )}
    </>
  );
}

export default ProfessionalList;
