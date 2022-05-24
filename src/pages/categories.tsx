import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { findCategories, login } from './data';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

const Categories = () => {
  async function getData() {
    await login()
    await setParts(findCategories)
  }
  const [isLoading, setIsLoading] = useState(true)
  const [parts, setParts] = useState([])
  useEffect( () => {
    getData()
    setIsLoading(false)
  },[])

  const router = useRouter();
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Dostępne kategorie</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {!isLoading && parts.map((product) => (
            <Link href={{
              pathname: '/category',
              query: product.category }} key={product.id}>
              <div className='group relative flex flex-col items-center justify-center'>
                <div
                  className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                  <img className='w-full h-full object-center object-cover' src={imageUrl(router, product.image)} />
                </div>
                <div className='mt-4 flex justify-between'>
                  <h3 className='text-sm text-gray-700'>
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Categories;
