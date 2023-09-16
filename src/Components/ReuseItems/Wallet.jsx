import React, { useEffect, useState } from "react";
import userAxiosInstance from "../../Axios/userAxios";
import proAxiosInstance from "../../Axios/proAxios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WithdrawWallet from "../user/WithdrawWallet/WithdrawWallet";
import Loader from "../Loader/Loader";

function Wallet() {
  const [wallet, setWallet] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [withDrawel, setWithdrawel] = useState(false);
  const [suspense, setSuspense] = useState(true);

  const location = useLocation();
  const type = location.pathname.includes("proffesional")
    ? "professional"
    : "user";

  let BaseAxois = location.pathname.includes("proffesional")
    ? proAxiosInstance()
    : userAxiosInstance();

  const senderData = useSelector((store) =>
    type === "professional"
      ? store.Proffessional.proData
      : store.Client.userData
  );

  useEffect(() => {
    if (senderData) {
      BaseAxois.get(
        `/walletdetails?senderData=${senderData._id}&type=${type}`
      ).then((res) => {
        if (res.data) {
          setWallet(res.data.wallet);
          setTransaction(res.data.transactions);
          setSuspense(false)
        }

      });
    }
  }, []);

  return (
    <>
    {suspense?
            <div className="flex w-screen h-screen justify-center items-center">
            <Loader/>
            </div>
    :(<div className="min-h-screen max-h-full pb-3 w-screen flex flex-col  gap-5 items-center  bg-slate-200">
      <div className="space-y-16 mt-5">
        <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform ">
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src="https://i.imgur.com/kGkSg1v.png"
            alt="Credit Card"
          />
          <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Name</p>
                <p className="font-medium tracking-widest">
                  {senderData ? senderData.name : ""}
                </p>
              </div>
              <img
                className="w-[5rem] h-[5rem]"
                src="/sim1.png"
                alt="Card Logo"
              />
            </div>
            <div className="mb-3">
              <p className="font-light text-xs">Wallet Amount</p>
              <p className="font-medium text-xl tracking-more-wider">
                ₹ {wallet}
              </p>
            </div>
            <div className="pt- pr-6">
              <div className="flex justify-between ">
                <div>
                  <p className="font-light text-xs">
                    {senderData ? senderData.email : ""}
                  </p>
                  <p className="font-medium tracking-wider text-sm"></p>
                </div>

                <div className="">
                  <button
                    onClick={() => setWithdrawel(true)}
                    title="withdraw"
                    className="font-light text-md  block"
                  >
                    Withdraw
                    <br />
                    <i className="fa-solid text-xl fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          withDrawel
            ? "h-[90%]  relative rounded-xl   items-center  w-3/6 text-center bg-slate-300"
            : "h-[35rem]  overflow-scroll relative rounded-xl  items-center pb-2 w-full  md:w-9/12 text-center bg-gradient-to-r from-blue-600 to-blue-500"
        }
      >
        {withDrawel ? (
          <WithdrawWallet wallet={wallet} setWithdraw={setWithdrawel} />
        ) : (
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Transactions</h2>
              {/* Add more buttons here if needed */}
            </div>
            <div className="grid justify-items-center xl:justify-items-stretch grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {transaction.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col border rounded-lg w-[95%] xl:w-auto  bg-white overflow-hidden shadow-md"
                >
                  <div className="p-1 flex items-center">
                    <img
                      src="/Ellipse20.png"
                      className="w-16 h-16 rounded-full mr-4"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border-t">
                    <div className="flex-grow">
                      <p className="text-lg font-semibold">
                        {type === "user"
                          ? `Received from ${item.professional.name}`
                          : `Sent to ${item.userId.name}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Transaction ID: {item._id}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-blue-600">
                      {type === "user"
                        ? `+${item.professional.fees}`
                        : `-${item.professional.fees}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>)}
    
    </>
  );
}

export default Wallet;
