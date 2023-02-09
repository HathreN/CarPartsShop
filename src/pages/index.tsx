import React from 'react';
import LastBoughtProducts from '@/components/LastBoughtProducts';
import IndexCategories from '@/components/IndexCategories';
import NewProducts from '@/components/NewProducts';
import Navbar2 from '@/components/Navbar2';
import { useUser } from '@auth0/nextjs-auth0';

const Index = () => {
  const { user } :any = useUser();
  if(user){
    localStorage.setItem('userEmail', user.email)
  }
  return (
    <div className='bg-gray-100 h-screen overflow-y-hidden'>
      <Navbar2 />
      <div className='bg-gray-100 lg:max-w-[1500px] sm:w-2/3 md:max-w-[675px] m-auto sm:mt-16 relative bg-white overflow-hidden w-screen md:flex wrap md:grid md:grid-cols-4 gap-x-6 '>
        <div className="bg-white sm:col-span-1 w-4/5 m-auto my-4">
          <IndexCategories/>
        </div>
        <div className='bg-white mx-auto sm:col-span-5 w-4/5 mb-2 rounded-t-2xl lg:h-[490px] md:h-[544px] w-full'>
            <NewProducts/>
        </div>
        <div className="mt-2 sm:ml-8 sm:col-span-6 w-4/5 m-auto">
          <LastBoughtProducts/>
        </div>
      </div>
    </div>
  );
};
export default Index;

