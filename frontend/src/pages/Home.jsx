import React from 'react';
import Navbar from '../components/pagecomponents/Navbar';
import HeroSection from '@/components/pagecomponents/HeroSection';
import HowitWorks from '@/components/pagecomponents/HowitWorks';
import TrendingPapers from '@/components/pagecomponents/TrendingPapers';
import Footer from '@/components/pagecomponents/Footer';
import Testimonials from '@/components/pagecomponents/Testimonials';

const Home = () => {
  return (
    <div className='w-full'>
        <Navbar />
        {/* content */}
        <div className=''>
          <HeroSection />
          <HowitWorks />
          <TrendingPapers />
          <Testimonials />
        </div>
        <Footer />

    </div>
  );
}

export default Home;
