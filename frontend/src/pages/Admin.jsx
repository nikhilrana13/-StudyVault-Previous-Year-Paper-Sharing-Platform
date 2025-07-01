import PendingPapers from '@/components/Admincomponents/PendingPapers';
import Navbar from '@/components/pagecomponents/Navbar';
import React from 'react';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        <PendingPapers />
      </div>
    </div>
  );
}

export default Admin;
