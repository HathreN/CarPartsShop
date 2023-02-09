import { useRouter } from 'next/router';
import Navbar2 from '@/components/Navbar2';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import LoadingOverlay from '@/components/LoadingOverlay';
import Link from 'next/link';
import Button from '@/components/UI/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper';
import React from 'react';

export const FIND_PART = gql`
  query FindPart($query: PartQueryInput!) {
    part(query: $query) {
      _id
        id
      name
        category
      price
        description
      image{
          link
      }
      carBrand
    }
  }
`;
export interface LocalStorageItem {
  id: number,
  amount: number
}

export interface LocalStorageCart {
  items: LocalStorageItem[];
}

const Part = () => {
  const router = useRouter()
  let {id}= router.query;

  const { loading, data } = useQuery<LocalStorageItem>(FIND_PART, {
    variables: { query: {id: id}  }
  });
  // @ts-ignore
  const part = data ? data.part : null;

  function handleSubmit(id: number) {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';

    const cart: LocalStorageCart = JSON.parse(itemJSONData);

    let item = cart.items.find((item: LocalStorageItem) => item.id === id);
    if (!item) {
      item = {
        id,
        amount: 1
      };
      cart.items.push(item);
    } else {
      item.amount++;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  interface DescriptionParams{description:string}
  function Description({description}:DescriptionParams){
    return (
      <div
        className="py-10 lg:pt-6 lg:pb-16 lg:col-start-3 lg:col-span-2 lg:border-r lg:border-gray-300">
        <div>
          <div className="space-y-6">
            <p className="text-base text-gray-900">{description}</p>
          </div>
        </div>
      </div>
    )
  }
  return (

    <div className="bg-white h-screen">
      <Navbar2 />
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            { !loading &&
              <li key={part.id}>
                <div className="flex items-center">
                  <Link href='categories'><p className='font-medium text-gray-700 hover:text-gray-900'>kategorie</p></Link>
                  <svg
                    width={16}
                    height={150}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className=" text-blue-500"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />

                  </svg>
                  <Link as={`category/${part.category}`} href={{
                    pathname: 'category',
                    query: 'category=' + part.category }} key={part.id}><p className='font-medium text-gray-700 hover:text-gray-900'>{part.category}</p></Link>
                  {/*category / part navigation*/}
                  <svg
                    width={16}
                    height={150}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className=" text-blue-500"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />

                  </svg>
                  <p className='font-medium text-gray-700 hover:text-gray-900'>{part.name}</p>
                </div>
                <div className="flex max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                  {!loading && part.image.length<=1 && <div className='justify-center flex'>
                    <img
                      className='object-fill w-[440px] h-[440px] rounded-xl'
                      src={part.image[0].link}
                      alt='image slide 1'
                    />
                  </div>
                  }
                  {!loading && part.image.length > 1 &&
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
                      className='mySwiper rounded-xl max-w-lg'
                    >
                      {!loading && !part && <div className='status'>Loading</div>}
                      {!loading && part?.image.map((lastBought:any) => (
                        <SwiperSlide className='grid grid-cols-1' key={lastBought.id}>
                            <img
                              className='rounded-xl'
                              src={lastBought.link}
                              alt='image slide 1'
                            />
                        </SwiperSlide>
                      ))
                      }
                    </Swiper>
                  }

                  <Description description={part.description}/>
                </div>
                <div
                  className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{part.name}</h1>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:row-span-3">
                    <p className="text-3xl text-gray-900">{part.price + ' zł'}</p>
                    <Button onClick={() => {
                      handleSubmit(part.id)
                    }}> Dodaj do koszyka
                    </Button>
                  </div>
                </div>
              </li>
            }
            {loading &&
              <LoadingOverlay />}
          </ol>
        </nav>

      </div>
    </div>
  );
};
export default Part;