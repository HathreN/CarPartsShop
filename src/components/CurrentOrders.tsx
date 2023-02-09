import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export const FIND_ORDERS = gql`
    query {
        orders(sortBy: ID_DESC) {
            _id
            orderPrice
            parts {
                id
            }
        }
    }
`;

export default function CurrentOrders() {
  const variables = [
    { name: 'Order id' },
    { name: 'Ilość przedmiotów' },
    { name: 'Cena zamówienia' }
  ];

  const { loading: orderLoading, data: orderData } = useQuery(FIND_ORDERS, {
    variables: { query: {} }
  });
  const order = orderData ? orderData.orders : null;
  const partList = [];
  if (!orderLoading) {
    order[0].parts.map((lastBought: any) => (
      partList.push(lastBought.id)
    ));
  }
  return (
    <>
      <header className='flex justify-center font-bold md:text-2xl'>Ostatnio złożone zamówienia</header>
      <div className='m-auto'>
        {(!orderLoading || !orderLoading) && !order && <div className='status'>Loading</div>}
        <div
          className='text-gray-900 flex justify-center items-center border-black border-solid border-b w-full'>{variables?.map((variable) => (
          <div className='w-1/3 flex justify-center m-auto'>{variable.name}</div>))}</div>
        {!orderLoading && order.map((singleOrder: any) => (
          <div key={singleOrder._id} className='flex flex-row border-black border-solid border-b w-full'>
            <div className='flex flex-1 flex-col'>
              <div className='flex font-medium text-gray-900 truncate'>
                {/*Nie działa*/}
                <p className=' w-[102px] md:w-1/3 truncate ml-2'><a href={`/about/${singleOrder.id}`} onClick={() => {
                }}>{singleOrder._id}</a></p>
                <p className='flex justify-center w-1/3'> {singleOrder.parts.length} </p>
                <p className='flex justify-center w-1/3'>{singleOrder.orderPrice + ' zł'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}