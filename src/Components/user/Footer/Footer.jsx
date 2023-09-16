import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/3">
          <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
          <p className="text-gray-300">
            Address: 123 Mechanic Street<br />
            City, State, ZIP
          </p>
          <p className="text-gray-300 mt-2">
            Phone: (123) 456-7890<br />
            Email: info@mechanicwebsite.com
          </p>
        </div>
        <div className="md:w-1/3">
          <h1 className="text-2xl font-semibold mb-4">Connect With Us</h1>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold mb-4">Quick Links</h1>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">Services</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">Testimonials</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-300">
        &copy; {new Date().getFullYear()} Mechanic Website. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
