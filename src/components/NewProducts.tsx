import React from 'react';

import gql from 'graphql-tag';

import { useQuery } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules

import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image'

export const FIND_LAST_BOUGHT_PARTS_IDS = gql`
    query {
        orders(sortBy: ID_DESC) {
            _id
            parts {
                id
            }
        }
    }
`;
export const FIND_LAST_BOUGHT_PARTS = gql`
    query findParts ($query: PartQueryInput!){
        parts(query: $query)
        {
            id
            name
            image{
                link
            }
        }
    }
`;
export default function NewProducts() {

  const { loading: orderLoading, data: orderData } = useQuery(FIND_LAST_BOUGHT_PARTS_IDS, {
    variables: { query: {} }
  });
  const order = orderData ? orderData.orders : null;
  const partList:any = [];
  if (!orderLoading) {
    order[0].parts.map((lastBought:any) => (
      partList.push(lastBought.id)
    ));
  }


  const { loading: partLoading, data: partData } = useQuery(FIND_LAST_BOUGHT_PARTS, {
    variables: { query: { id_in: partList } }
  });
  const part = partData ? partData.parts : null;

  return (
    <div className='w-full'>
      <>
        <header
          className='flex text-white items-center justify-center bg-navbar-accents text-center w-full h-10 text-xl rounded-t-2xl'>Ostatnio
          dodane przedmioty
        </header>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          modules={[Autoplay, Pagination]}
          className='mySwiper rounded-xl'
        >
          {(!orderLoading || !partLoading) && !order && <div className='status'>Loading</div>}

          {!partLoading && part?.map((lastBought:any) => (
            <SwiperSlide className='grid grid-cols-1 group relative justify-center flex' key={lastBought.id}>
              <div className='flex justify-center'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  {lastBought.name}
                </h3>
              </div>
              <div
                className='object-fill rounded-xl aspect-w-1 aspect-h-1 w-full h-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none flex justify-center'>
                <Image
                  src={lastBought.image[0].link}
                  alt="Picture of the author"
                  width="350px"
                  height="350px"
                />
              </div>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </>
    </div>


  );
}