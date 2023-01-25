import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Categories } from '@/types_realm';
import LoadingOverlay from '@/components/LoadingOverlay';
import Link from 'next/link';
import { BsList } from 'react-icons/bs';
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
  const { loading, data} = useQuery<{
    categories: any;
    parts: Categories[] }>(FIND_CATEGORIES, {
    variables: { query: {} }
  });
  const category = data ? data.categories : null;
  return (
    <div>
      <section className='flex text-white rounded-t-2xl items-center justify-center gap-2 bg-navbar-accents text-center w-full h-10'>
        <BsList color="white" size={25}/>
        <header className="text-xl">Kategorie</header>
      </section>
      <div className='w-full'>
        <div className='grid sm:grid-cols-4 sm:grid-rows-4 md:grid-cols-1 sm:grid-rows-1 sm:grid-cols-10 text-navbar-primary font-semibold text-lg '>
          {(!loading &&
            !category && <div className='status'>Loading</div>)}

          {!loading && category.map((singleCategory: { id: React.Key | null | undefined; category: string; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
            <div key={singleCategory.id} className="hover:text-cyan-700 hover:bg-gray-200 hover:cursor-pointer">
              <Link as={`category/${singleCategory.category}`} href={{
                pathname: 'category',
                query: 'category=' + singleCategory.category }} key={singleCategory.id}>
                  <div className="mx-4 my-2">
                    {singleCategory.name}
                  </div>
              </Link>
            </div>
          ))}
          {loading &&
            <LoadingOverlay />}
        </div>
      </div>
    </div>
  )
}