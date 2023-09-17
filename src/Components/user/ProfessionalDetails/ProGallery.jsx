import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../Axios/proAxios';

function ProGallery({ proId, fun }) {
  const proAxios = AxiosInstance();
  const [loading, setLoading] = useState('');
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      const getGallery = async () => {
        const response = await proAxios.post("getGallery", { proId });
        if (response) {
          setGallery(response.data.gallery);
          setLoading(false); // Set loading to false after the API call completes
        }
      };
      getGallery();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        onClick={() => fun(false)} // Close the modal when backdrop is clicked
      >
        {/* Modal content */}
        <div className="bg-white p-4 md:p-10 w-full max-w-4xl mx-auto h-[95%] overflow-scroll rounded shadow-lg">
          {/* Close button */}
          <button
            onClick={() => fun(false)}
            className="absolute top-3 z-10 left-2 p-2 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors"
          >
            <i className="fa-solid fa-backward text-blue-700 text-xl"></i>
          </button>
          {/* Gallery images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item._id} className="relative  group">
                <img
                  className="rounded-lg w-full h-28 transition-transform transform hover:scale-105"
                  src={item?.image || ''}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProGallery;
