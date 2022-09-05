import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Categories } from '@/types_realm';
import LoadingOverlay from '@/components/LoadingOverlay';
import Link from 'next/link';
export const FIND_CATEGORIES = gql`
    query {
        categories (sortBy: ID_ASC ){
            _id
            id
            name
            category
            imageSrc
        }
    }
`;

export default function IndexCategories() {
  const { loading, data, error } = useQuery<{ parts: Categories[] }>(FIND_CATEGORIES, {
    variables: { query: {} }
  });
  const category = data ? data.categories : null;
  return (
    <div className="flex justify-center">
      <div className='bg-amber-100 max-w-5xl rounded-2xl text-center mt-16 ml-8 w-full'>
        <div className='text-black'>CATEGORIES PANEL PLACEHOLDER</div>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {(!loading &&
            !category && <div className='status'>Loading</div>)}

          {!loading && category.map((singleCategory) => (
            <Link prefetch as={`category/${singleCategory.category}`} href={{
              pathname: 'category',
              query: 'category=' + singleCategory.category }} key={singleCategory.id}>{singleCategory.name}</Link>
          ))}
          {loading &&
            <LoadingOverlay />}
        </div>
      </div>
    </div>
  )
}