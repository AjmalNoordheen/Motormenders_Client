import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const ChatList = ({chatList, setReceiver,type,isLoading,show,setDisplay,display}) => {
  
  const location = useLocation()
  const senderType = location.pathname.includes('proffesional') ? 'professional' : 'user'
const senderData = useSelector((store) => senderType === 'professional' ?   store.Proffessional.proData : store.Client.userData);

  const PassID =(id)=>{
    try {
      setReceiver(id)
      setDisplay(false)
    } catch (error) {
      
    }
  }
  return (
    <>
    <div className={!display?"hidden md:flex w-11/12 md:w-7/12 lg:6/12 xl:w-4/12 h-[92%]  justify-center items-center rounded-lg bg-gray-300 ml-2 ":"w-11/12 md:w-7/12 lg:6/12 xl:w-4/12 h-[92%] flex justify-center items-center rounded-lg bg-gray-300 md:ml-2 "}>
          <div className="h-[90%]  overflow-scroll w-[96%]  bg-gray-200">
			<p className="m-2 font-bold">Chats</p>
      {isLoading?<div className='w-fukk h-full flex justify-center items-center'>
      <Loader/>
    </div>:<>
    { chatList ? (
                chatList.map((list) => {
                return (           
                  <div
                    onClick={() => {
                     PassID(list._id) 
                    }}
                    className="m-1 bg-white h-[5rem]  flex items-center"
                  >
                    <img
                      src={type=='professional' ? list?.user?.image : list.professional.image}
                      className="h-[50%] rounded-full  md:block w-[10%] ml-[1%]"
                      alt=""
                    />
                    <div className="overflow-hidden ml-3 h-[60%]  w-full">
                      <h1 className="font-bold">{type=='professional' ?list?.user?.name : list.professional.name}</h1>
                        {show.receiver == list._id ?  <small className="w-[100%]">{show.text}</small>:''}                     
                    </div>
                    <div className="md:mr-[2%] text-end w-full flex-col h-full">
                      <p className="text-xs">
                        {list.messages &&
                        list.messages[list.messages.length - 1] &&
                           new Date(
                              list.messages[list.messages.length - 1].timestamp
                            ).toLocaleDateString()
                           }
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>no list</h1>
              </div>
            )}
    </>
    
    }
           
          </div>
        </div>
        </>
  )
}

export default ChatList
