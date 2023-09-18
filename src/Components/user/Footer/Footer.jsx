import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
          <p className="text-gray-300">
            Address: 123 Mechanic Street<br />
            City, State, ZIP
          </p>
          <p className="text-gray-300 mt-2">
            Phone: +91 95 456-7890<br />
            Email: motormenders@gmail.com
          </p>
        </div>
        <div>
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
        <div>
          <h1 className="text-2xl font-semibold mb-4">Quick Links</h1>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">Services</a>
            </li>
            <li className="mb-2">
              <Link href="#" className="text-gray-300 hover:text-white">About Us</Link>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-300 hover:text-white">Testimonials</a>
            </li>
            <li className="mb-2">
              <Link to={'/contact'} className="text-gray-300 hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-300">
        &copy; {new Date().getFullYear()} MotorMenders. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
