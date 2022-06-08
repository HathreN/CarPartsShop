import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { LocalStorageCart, LocalStorageItem } from '@/pages/part';
import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

let products = [];
export const FIND_ALL_PARTS = gql`
    query FindAllParts($query: PartQueryInput!) {
        parts(query: $query) {
            _id
            id
            name
            price
            image
            link
            carBrand
            amount
        }
    }
`;
let carParts = [];

let queryList = [];
export default function ShoppingCart() {

  const [open, setOpen] = useState(false);
  if (open) {
    queryList= []
    refreshCart();
    products.forEach((product) => {
      queryList.push(product.id)
      console.log("["+queryList+"]")
    })
  }
  const { loading, data } = useQuery(FIND_ALL_PARTS, {
    variables: { query: {id_in: queryList} }
  });
  const parts = data ? data.parts : null;
  console.log(parts)
  const router = useRouter();

  function refreshCart() {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';
    const cart: LocalStorageCart = JSON.parse(itemJSONData);
    let i: number = 0;
    cart.items.forEach((item: LocalStorageItem) => {
      products[i] = item;
      i++;
    });
  }
  let priceTotal: number = 0;

    let i: number = 0;
  function found(id: number) {
    let check: boolean = false;
    products.find((obj) => {
      if ((obj.id == id) == true) {
        check = true;
        let tempPart = Object.freeze(parts[id-1]);
        tempPart = { id: tempPart.id, name: tempPart.name, price: tempPart.price, image: tempPart.image, link: tempPart.link, carBrand: tempPart.carBrand, amount: obj.amount };
        carParts[i] = tempPart;
        i++;
        priceTotal += parts[id - 1].price * obj.amount;
      } else {
        check = false;
      }
      return obj.id == id;
    });
    return check;
  };
  return (
    <div>
      <div>
        <AiOutlineShoppingCart size={30} onClick={() => {
          setOpen(true);
        }} />
      </div>
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
                          <Dialog.Title className='text-lg font-medium text-gray-900'> Shopping cart </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='-m-2 p-2 text-gray-400 hover:text-gray-500'
                              onClick={() => setOpen(false)}
                            >
                              <span className='sr-only'>Close panel</span>
                              <XIcon className='h-6 w-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>

                        <div className='mt-8'>
                          <div className='flow-root'>
                            <ul role='list' className='-my-6 divide-y divide-gray-200'>
                              {parts && parts.map((product, index) => (
                                  <li key={product.id} className='flex py-6'>
                                    <div
                                      className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                      <img className='w-full h-full object-center object-cover'
                                           src={imageUrl(router, product.image)} alt={product.name} />
                                    </div>

                                    <div className='ml-4 flex flex-1 flex-col'>
                                      <div>
                                        <div className='flex justify-between text-base font-medium text-gray-900'>
                                          <h3>
                                            <a href={product.link}> {product.name} </a>
                                          </h3>
                                          <p className='ml-4'>{product.price}</p>
                                        </div>
                                        <p className='mt-1 text-sm text-gray-500'>{product.carBrand}</p>
                                      </div>
                                      <div className='flex flex-1 items-end justify-between text-sm'>
                                        <p className='text-gray-500'>Amount: {carParts[i-1].amount}</p>

                                        <div className='flex'>
                                          <button
                                            type='button'
                                            className='font-medium text-indigo-600 hover:text-indigo-500'
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
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
                            className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                          >
                            Przejdź do płatności
                          </a>
                        </div>
                        <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                          <p>
                            lub{' '}
                            <button
                              type='button'
                              className='font-medium text-indigo-600 hover:text-indigo-500'
                              onClick={() => setOpen(false)}
                            >
                              Przeglądaj sklep dalej<span aria-hidden='true'> &rarr;</span>
                            </button>
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

