import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useQuery } from '@apollo/client';
import * as React from 'react';
import gql from 'graphql-tag';

export const FIND_CATEGORIES = gql`
    query {
        categories (sortBy: ID_ASC ){
            _id
            id
            name
            category
            href
            imageSrc
        }
    }
`;
const Categories = () => {

  const { loading, data, error } = useQuery(FIND_CATEGORIES, {
    variables: { query: { name: 'wnetrze' } }
  });
  const category = data ? data.categories : null;
  const router = useRouter();
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Dostępne kategorie</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {(!loading &&
          !category && <div className='status'>Loading</div>)}

          {category && category.map((singleCategory) => (
            <Link href={{
              pathname: '/category',
              query: singleCategory.category
            }} key={singleCategory.id}>
              <div className='group relative flex flex-col items-center justify-center'>
                <div
                  className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                  <img className='w-full h-full object-center object-cover'
                       src={imageUrl(router, singleCategory.imageSrc)} />
                </div>
                <div className='mt-4 flex justify-between'>
                  <h3 className='text-sm text-gray-700'>
                    {singleCategory.name}
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
