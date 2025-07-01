import React from 'react';
import { NavLink } from 'react-router-dom';
import studyimg from "../../assets/study.svg"
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const user = useSelector((state) => state.Auth.user);
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto  px-4 flex flex-col md:flex-row items-center justify-between">
        {/* <!-- Left Side Content Here --> */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Unlock Quality Study Materials 📚
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-lg">
            Explore and share previous year papers, handwritten notes, and trusted content from students like you. Join the StudyVault community and level up your exam prep.
          </p>

          <div className="mt-6 flex gap-4">
            <NavLink to={`${user ? "/uploadpaper" : "/login"}`}>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
              {user ? "Upload Papers" : "Get Started"}
            </button>
            </NavLink>
            <NavLink to="/findpapers">
            <button className="bg-white border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100">
              Browse Papers
            </button>
            </NavLink>
         
          </div>

        </div>
        {/* <!-- Right Side Content Here */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img src={studyimg} className='rounded-lg' alt="Study Vault Illustration" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
