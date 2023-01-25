import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import ShoppingCart from '@/components/shoppingCart';
import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
export const FIND_ALL_PARTS = gql`
    query FindAllParts($query: PartQueryInput!) {
        part(query: $query) {
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

const navigation = [
  { name: 'Bestsellery', href: '/bestsellers' },
  { name: 'Kategorie', href: '/categories' },
  { name: 'O nas', href: '/about' },
  { name: 'admin', href: '/adminPanel' },
];
export default function Navbar({}) {
  const [searchText, setSearchText] = React.useState("");
  const { loading, data } = useQuery(FIND_ALL_PARTS, {
    variables: { query: { name: searchText } }
  });
  const part = data ? data.part : null;
  const { user } = useUser();
  // style={{ background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,128,0,1) 17%, rgba(255,252,0,1) 33%, rgba(31,255,0,1) 50%, rgba(0,35,255,1) 66%, rgba(175,0,255,1) 83%, rgba(255,0,215,1) 100%)' }}
  return (
    <Popover>
      <div className='top-0 left-0 w-screen px-4 sm:px-6 lg:px-8 py-2 fixed bg-navbar-primary  shadow-lg'>
        <nav className='relative flex items-center justify-between sm:h-10 lg:justify-start' aria-label='Global'>
          <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
            <div className='flex items-center justify-between w-full md:w-auto '>
              <Link href='/'>
                  <img className='h-8 w-auto sm:h-10 rounded-full hover:opacity-50' src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt='cos' />
              </Link>
              <div className='-mr-2 flex items-center md:hidden'>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {!loading ? (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>
          <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
            {navigation.map((item) => (
              <Link href={{
                pathname: item.href
              }} key={item.name}><span className='font-medium text-indigo-600 hover:text-gray-900'>{item.name}</span></Link>
            ))}

            {(user) ? (
              <a href={'/api/auth/logout'} className='font-medium text-indigo-600 hover:text-gray-900 hover:no-underline'>
                Wyloguj się
              </a>) : (
              <a href={'/api/auth/login'} className='font-medium text-indigo-600 hover:text-gray-900 hover:no-underline'>
                <span style={{textDecorationLine: 'none'}}>Zaloguj się</span>
              </a>
            )}
          </div>
          <div className='title-input ml-5'>
            <input
              className='text-center fancy-input placeholder-red-600 text-red-600 rounded-full'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type='text'
              placeholder="Wpisz nazwę części"
            />
            {part && !loading && (
              <Link href={{
                pathname: 'part',
                query: 'id=' + part.id
              }}><span className='font-medium text-indigo-600 hover:text-gray-900'>{part.name}</span></Link>
              )}
          </div>
          <div className='absolute flex items-center sm:h-10 lg:justify-end right-0' aria-label='ShoppingCart'>
            <ShoppingCart />
          </div>
        </nav>
      </div>
    </Popover>
  );
}
