import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black p-4 text-center shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <FaRegCopyright className="mr-2" />
        <p>&copy; 2024 taskGenie. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
