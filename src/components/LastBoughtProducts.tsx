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
import { useRouter } from 'next/router';
import { imageUrl } from '@/utils/Image';
import { toast } from 'react-toastify';
import loading = toast.loading;

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
            image
        }
    }
`;
export default function LastBoughtProducts() {
  const router = useRouter();

  const { loading: orderLoading, data: orderData } = useQuery(FIND_LAST_BOUGHT_PARTS_IDS, {
    variables: { query:{} }
  });
  const order = orderData ? orderData.orders : null;
  const partList =[]
  if(!orderLoading){
    order[0].parts.map((lastBought) => (
      partList.push(lastBought.id)
    ))
  }


  const { loading: partLoading, data: partData } = useQuery(FIND_LAST_BOUGHT_PARTS, {
    variables: { query: { id_in: partList } }
  });
  const part = partData ? partData.parts : null;

  return (
    <div className='bg-amber-100 rounded-2xl max-w-2xl mr-8 mt-32 w-1/3'>
      <>
        <header className='flex justify-center font-bold text-2xl'>Ostatnio kupione przedmioty</header>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          modules={[Autoplay, Pagination]}
          className='mySwiper m-8 rounded-xl'
        >
          {(!orderLoading || !partLoading)&& !order && <div className='status'>Loading</div>}

          {!partLoading && part?.map((lastBought) => (
            <SwiperSlide className='grid grid-cols-1'>
              <div className='justify-center flex'>
                <img
                  className='object-fill w-3/5 h-3/5 rounded-xl'
                  src={imageUrl(router, lastBought.image)}
                  alt='image slide 1'
                />
                <p className="col-start-1">
                  {lastBought.name}
                </p>
              </div>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </>
    </div>


  );
}