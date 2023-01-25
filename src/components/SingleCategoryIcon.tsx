import Link from 'next/link';
import * as React from 'react';

// @ts-ignore
export default function SingleCategoryIcon({singleCategory}) {

  return (
    <Link as={`category/${singleCategory.category}`} href={{
      pathname: 'category',
      query: 'category=' + singleCategory.category }} key={singleCategory.id}>
      <div className='group relative flex flex-col items-center justify-center'>
        <div
          className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 hover:shadow-lg hover:border-2 lg:h-80 lg:aspect-none'>
          <img className='w-full h-full object-center object-cover'
               src={singleCategory.imageSrc} />
        </div>
        <div className='mt-4 flex justify-between'>
          <h3 className='text-sm text-gray-700'>
            {singleCategory.name}
          </h3>
        </div>
      </div>
    </Link>
  )

}