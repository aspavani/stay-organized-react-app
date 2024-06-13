import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Import your logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center">
          <img src={logo} alt="taskGenie Logo" className="h-10 mr-2" />
          <h1 className="text-2xl font-bold text-black">taskGenie</h1>
        </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul className={`hidden md:flex space-x-4 items-center`}>
          <li>
            <Link to="/" className="text-black flex items-center px-4 py-2 md:py-0 hover:bg-gray-100 rounded-md transition duration-300">
              <FaHome className="mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/todos" className="text-black flex items-center px-4 py-2 md:py-0 hover:bg-gray-100 rounded-md transition duration-300">
              <FaTasks className="mr-1" /> Todos
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-black flex items-center px-4 py-2 md:py-0 hover:bg-gray-100 rounded-md transition duration-300">
              <FaUserPlus className="mr-1" /> Register
            </Link>
          </li>
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <li>
            <Link to="/" className="text-black flex items-center hover:bg-gray-100 rounded-md transition duration-300">
              <FaHome className="mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/todos" className="text-black flex items-center hover:bg-gray-100 rounded-md transition duration-300">
              <FaTasks className="mr-1" /> Todos
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-black flex items-center hover:bg-gray-100 rounded-md transition duration-300">
              <FaUserPlus className="mr-1" /> Register
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
