import React from 'react';
import Navbar2 from '@/components/Navbar2';
import CurrentOrders from '@/components/CurrentOrders';

const adminPanel = () => {
  return (
    <div className='bg-gray-100 h-screen'>
      <Navbar2 />
      <div className='bg-gray-100 lg:max-w-[1500px] sm:w-2/3 md:max-w-[675px] m-auto sm:mt-16 relative bg-white overflow-hidden w-screen md:flex wrap md:grid md:grid-cols-4 gap-x-6 '>

        <div className='bg-white mx-auto sm:col-span-5 w-4/5 mb-2 border-4 border-black mt-4'>
          <CurrentOrders />
        </div>
      </div>
    </div>
  );
};
export default adminPanel;
