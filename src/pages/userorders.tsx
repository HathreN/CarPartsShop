import Navbar2 from '@/components/Navbar2';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import React from 'react';
import PartsOverlay from '@/components/partsOverlay';
import { useUser } from '@auth0/nextjs-auth0';
export const FIND_ORDERS = gql`
    query FindOrder($query: OrderQueryInput!){
        orders(query: $query ,sortBy: ID_DESC) {
            _id
            orderPrice
            parts {
                id
                amount
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
export default () => {
  const { user } = useUser();
  const variables = [
    { name: 'Order id'},
    { name: 'Ilość przedmiotów'},
    { name: 'Cena zamówienia'},
  ]
  let order;
  const { loading: orderLoading, data: orderData } = useQuery(FIND_ORDERS, {
    variables: { query: { userName: "uroxx12@gmail.com" } }
  });
  order = orderData ? orderData.orders : null;
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
  function showItems(attribute:any){
    // @ts-ignore
    return document.getElementById("partsOverlay").hidden=attribute;
  }
    return (
      <div>
        <Navbar2 />
        <header className='flex justify-center font-bold text-2xl'>Zamówienia użytkownika: {user?.email}</header>
        <div id="partsOverlay">
          {!partLoading &&<PartsOverlay part={part}/>}
        </div>
        <div className="lg:max-w-[1500px] sm:w-2/3 md:max-w-[675px] m-auto sm:mt-16 relative bg-white overflow-hidden w-screen md:flex wrap md:grid md:grid-cols-4 gap-x-6">
        <div className="bg-gray-100 justify-center mx-auto sm:col-span-5 w-4/5 mb-2 border-4 border-black  ">
          {(!partLoading || !partLoading)&& !order && <div className='status'>Loading</div>}
          <div className='text-gray-900 flex flex-row justify-center items-center border-black border-solid border-b'>{variables?.map((variable) => (<div className='w-1/3 flex justify-center m-auto'>{variable.name}</div>))}</div>
            {!partLoading && order && order.map((singleOrder:any) => (
              <div key={singleOrder._id} className='flex flex-row py-6 border-black border-solid border-b w-full'>
                <div className='flex flex-1 flex-col'>
                  <div>
                    <div className='flex text-base font-medium text-gray-900'>
                      {/*Nie działa*/}
                      <p className='flex justify-center w-1/3'> <a className="truncate" href={`/about/${singleOrder.id}`} onClick={()=>{}}>{singleOrder._id}</a></p>
                      <p className='flex justify-center w-1/3' onClick={()=>{showItems(false)}} onMouseOut={showItems(true)}> Ilość produktów: {singleOrder.parts.length} </p>
                      <p className='flex justify-center w-1/3'>{singleOrder.orderPrice + ' zł'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
};