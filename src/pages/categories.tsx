import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { useQuery } from '@apollo/client';
import * as React from 'react';
import gql from 'graphql-tag';
import { Categories } from '@/types_realm';
import LoadingOverlay from '@/components/LoadingOverlay';
import SingleCategoryIcon from '@/components/SingleCategoryIcon';

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

  const { loading, data, error } = useQuery<{ parts: Categories[] }>(FIND_CATEGORIES, {
    variables: { query: { name: 'wnetrze' } }
  });
  const category = data ? data.categories : null;
  return (
    <div className='bg-white'>
      <Navbar />
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Dostępne kategorie</h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {(!loading &&
          !category && <div className='status'>Loading</div>)}

          {!loading && category.map((singleCategory) => (
            <SingleCategoryIcon singleCategory={singleCategory}/>
          ))}
          {loading &&
            <LoadingOverlay />}
        </div>
      </div>
    </div>
  );
};
export default Categories;
