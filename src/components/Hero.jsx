import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png'; // Add an appropriate hero image in your assets folder

const Hero = () => {
  return (
    <section className="bg-white text-black py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left md:pr-8">
          <h2 className="text-4xl font-bold mb-4">Welcome to taskGenie</h2>
          <p className="text-xl mb-8">
            Ready to turn your to-dos into ta-das? With taskGenie, your tasks magically organize themselves! Join us and start genie-fying your task list today.
          </p>
          <Link to="/todos" className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Discover Your Tasks
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src={heroImage} alt="Hero" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
