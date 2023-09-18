import React from 'react';
import NavBar from '../user/Navbar/Navbar'

function Contact() {
  return (

    <div className="bg-gray-100 min-h-screen">
       <div className='bg-blue-600'>
       <NavBar/>
       </div>
      {/* Header */}
      <header className="bg-gray-100 text-black py-10 text-center">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
      </header>

      {/* Contact Information */}
      <section className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full border border-gray-300 rounded py-2 px-3 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          
        </div>
      </section>

      {/* SVG Image */}
      <div className="bg-blue-500 py-20">
        <div className="container mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-40 text-white mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="8"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Contact;
