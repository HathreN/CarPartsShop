import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';

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
            category
            image{
                link
            }
        }
    }
`;
export default function LastBoughtProducts() {

  const { loading: orderLoading, data: orderData } = useQuery(FIND_LAST_BOUGHT_PARTS_IDS, {
    variables: { query:{} }
  });
  const order = orderData ? orderData.orders : null;
  const partList:any =[]
  if(!orderLoading){
    order[0].parts.map((lastBought:any) => (
      partList.push(lastBought.id)
    ))
  }


  const { loading: partLoading, data: partData } = useQuery(FIND_LAST_BOUGHT_PARTS, {
    variables: { query: { id_in: partList } }
  });
  const part = partData ? partData.parts : null;

  return (
    <>
      <header className='flex justify-center font-bold text-2xl'>Ostatnio kupione przedmioty</header>
      <div className='flex justify-center mr-8 mt-2 grid grid-cols-6'>
        {(!orderLoading || !partLoading)&& !order && <div className='status'>Loading</div>}

            {!partLoading && part?.map((lastBought:any) => (
              <Link as={`category/${lastBought.category}`} href={{
                pathname: 'category',
                query: 'category=' + lastBought.category }} key={lastBought.id}>
                <div className='group relative flex flex-col items-center justify-center'>
                  <div
                    className='bg-gray-200 rounded-md overflow-hidden'>
                    <Image
                      src={lastBought.image[0].link}
                      alt="Błąd serwera"
                      width="350px"
                      height="350px"
                    />
                  </div>
                  <div className='mt-4 flex justify-between overflow-hidden hover:h-20 h-10'>
                    <h3 className='text-sm text-gray-700'>
                      {lastBought.name}
                    </h3>
                  </div>
                </div>
              </Link>

            ))
            }
      </div>
    </>

  );
}