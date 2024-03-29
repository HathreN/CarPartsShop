import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { LocalStorageCart, LocalStorageItem } from '@/pages/part';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import ShoppingCartProduct from '@/components/ShoppingCartProduct';
import Button from '@/components/UI/Button';

let products:object = [];
export const FIND_ALL_PARTS = gql`
    query FindAllParts($query: PartQueryInput!) {
        parts(sortBy: ID_ASC,query: $query) {
            _id
            id
            name
            price
            image{
                link
            }
            link
            carBrand
            amount
        }
    }
`;
let carParts:object = [];

// @ts-ignore
let queryList:any = [];
export default function ShoppingCart() {

  let priceTotal: number = 0;
  const [open, setOpen] = useState(false);
  if (open) {
    queryList= []
    refreshCart();
    // @ts-ignore
    products.forEach((product) => {
      queryList.push(product.id)
    })
  }
  const { loading, data } = useQuery(FIND_ALL_PARTS, {
    variables: { query: {id_in: queryList} }
  });
  const parts = data ? data.parts : null;
  let index: number =0;
  function SortArrayAlpha(x:any, y:any){
    if (x.id < y.id) {return -1;}
    if (x.id > y.id) {return 1;}
    return 0;
  }
  if(!loading) {
    // @ts-ignore
    products.sort(SortArrayAlpha)
    // @ts-ignore
    products.forEach((product:any) => {
      let tempPart = Object.freeze(parts[index]);
      tempPart = {
        id: tempPart.id,
        name: tempPart.name,
        price: tempPart.price,
        image: tempPart.image,
        link: tempPart.link,
        carBrand: tempPart.carBrand,
        amount: product.amount
      };
      // @ts-ignore
      carParts[index] = tempPart;
      // @ts-ignore
      priceTotal += parts[index].price * products[index].amount;
      index++
    })
  }

  function refreshCart() {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';
    const cart: LocalStorageCart = JSON.parse(itemJSONData);
    let i: number = 0;
    cart.items.forEach((item: LocalStorageItem) => {
      // @ts-ignore
      products[i] = item;
      i++;
    });
  }


  return (
    <div>
      <button className="flex rounded-full p-2 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-gray-700 hover:text-white">
        <span className="sr-only rounded-full">Open shopping cart</span>
        <AiOutlineShoppingCart size={30} color="white" onClick={() => {
          setOpen(true);
        }} />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                      <div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-lg font-medium text-gray-900'> Przedmioty znajdujące się w twoim koszyku </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center -m-2 p-2 text-gray-400 hover:text-gray-500'>
                            <Button onClick={() => setOpen(false)} ><XIcon className='h-6 w-6' aria-hidden='true' /></Button>
                          </div>
                        </div>

                        <div className='mt-8'>
                          <div className='flow-root'>
                            <ul role='list' className='-my-6 divide-y divide-gray-200'>
                              {parts && parts.map((product:any, index:number) => (
                                  <ShoppingCartProduct product={product} carParts={carParts} index={index}/>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                        <div className='flex justify-between text-base font-medium text-gray-900'>
                          <p>Cena produktów</p>
                          <p>{priceTotal + ' zł'}</p>
                        </div>
                        <p className='mt-0.5 text-sm text-gray-500'>Koszty dostawy i podatek naliczany przy
                          płatności.</p>
                        <div className='mt-6'>
                          <a
                            href='/checkout'
                            className='flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600'
                          >
                            Przejdź do płatności
                          </a>
                        </div>
                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                          <p>
                            lub{' '}
                            <Button onClick={() => setOpen(false)}>Przeglądaj sklep dalej<span aria-hidden='true'> &rarr;</span></Button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

