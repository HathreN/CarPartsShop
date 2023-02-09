import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function PartsOverlay({part,id}:any) {
  return (
    <div id="partsOverlay" className="fixed bg-gray-900 top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 flex flex-col items-center justify-center">
      <div onClick={()=>{ // @ts-ignore
        document.getElementById('partsOverlay').hidden=true}} className='w-[60px] h-[60px] object-center object-cover fixed right-0 top-0'><FaTimes fontSize="40" className="text-white md:mt-8 md:mr-20"/></div>
      <div className="font-bold text-2xl border-white border-2 border-solid w-4/5 md:w-2/3 md:h-2/3 rounded-xl p-8 opacity-100 bg-white">
        <div className="flex md:justify-center md:items-center text-black">
          Lista przedmiotów zamówienia
        </div>
        <p className="truncate">({id})</p>
        <div className="m-auto grid-cols-1 items-center">
        {part.map((product:any) => (
          <div key={product.id} className='flex flex-row py-6'>
            <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
              <img className='w-full h-full object-center object-cover' src={product.image[0].link}
                   alt={product.name} />
            </div>
            <div className='ml-4 flex flex-1 flex-col'>
              <div>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <h3>
                    <a href={product.link}> {product.name}</a>
                    <p>Ilość: 1</p>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}