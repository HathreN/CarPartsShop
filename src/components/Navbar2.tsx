import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FaHome, FaUser } from 'react-icons/fa';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ShoppingCart from '@/components/shoppingCart';
import { LocalStorageCart} from '@/pages/part';
import { useUser } from '@auth0/nextjs-auth0';

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
  { name: 'Strona główna', href: '/', current: false },
  { name: 'Bestsellery', href: '/bestsellers', current: false  },
  { name: 'Kategorie', href: '/categories', current: false  },
  { name: 'O nas', href: '/about', current: false  },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar2() {
  let [cartLength] = useState(0);
  const { user} = useUser();
  useEffect(() => {
    const itemJSONData = localStorage.getItem('shoppingCart') || '{"items": []}';
    const cart: LocalStorageCart = JSON.parse(itemJSONData);
    const shoppingCart=document.getElementById("shoppingCart")
    if (cart.items.length == 0) {
      // @ts-ignore
      shoppingCart.style.display = 'none';
    } else {
      // @ts-ignore
      shoppingCart.style.display = 'block';
    }
  },[cartLength]);
  const [searchText, setSearchText] = React.useState("");
  const { loading, data } = useQuery(FIND_ALL_PARTS, {
    variables: { query: { name: searchText } }
  });
  const part = data ? data.part : null;

  function resetCurrentNavigation(currentPage: number){
    navigation.forEach((item) => {
      item.current = false
    })
    // @ts-ignore
    navigation[currentPage].current=true;
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <MenuIcon className="block h-6 w-6 hover:bg-gray-700 hover:text-white" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6 hover:bg-gray-700 hover:text-white" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href='/'>
                <div className="flex flex-shrink-0 items-center hover:bg-gray-700 hover:text-white rounded-full p-1" onClick={()=>{resetCurrentNavigation(0)}}>
                  <FaHome className='block h-8 w-auto lg:hidden'/>
                  <FaHome className="hidden h-8 w-auto lg:block" />
                </div>
              </Link>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item,id) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}>
                        <span className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )} onClick={()=>{
                          resetCurrentNavigation(id)
                        }}>{item.name}</span>
                      </Link>
                    ))}
                    <div className='title-input'>
                      <input
                        className={'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
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
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full p-2 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:bg-gray-700 hover:text-white">
                      <span className="sr-only rounded-full">Open user menu</span>
                      <FaUser size={20}/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user &&<Menu.Item>
                        {({ active }) => (
                          <span className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                            <div>
                            <span className={'block px-4 py-2 text-sm text-gray-700'} onClick={()=>{
                              location.href=('http://localhost:3000/userprofile')
                              resetCurrentNavigation(0)}}>Twój profil</span>
                          </div>
                          </span>
                        )}
                      </Menu.Item>}
                      {user &&<Menu.Item>
                        {({ active }) => (
                          <span className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          <div>
                            <span className={'block px-4 py-2 text-sm text-gray-700'} onClick={()=>{
                              location.href=('http://localhost:3000/userorders')
                              resetCurrentNavigation(0)}}>Twoje zamówienia</span>
                          </div>
                          </span>
                        )}
                      </Menu.Item>}
                      <Menu.Item>
                        {({ active }) => (
                          <span className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}>
                            <div>
                            {!user&& <span className={'block px-4 py-2 text-sm text-gray-700'} onClick={()=>{
                              location.href=('http://localhost:3000/api/auth/login')
                              resetCurrentNavigation(0)}}>Zaloguj się</span>}
                            {user&&<span className={'block px-4 py-2 text-sm text-gray-700'} onClick={()=>{
                              location.href=('http://localhost:3000/api/auth/logout')
                              resetCurrentNavigation(0)}}>Wyloguj się</span>}
                          </div>
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}>
                            <div>
                              {user?.email=="uroxx12@gmail.com" &&<span className={'block px-4 py-2 text-sm text-gray-700'} onClick={()=>{
                                location.href=('http://localhost:3000/adminPanel')
                                resetCurrentNavigation(0)}}>Przejdź do panelu administratora</span>}
                          </div>
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className='absolute flex top-2 items-center justify-center sm:h-10 lg:justify-end right-14' id='shoppingCart' aria-label='ShoppingCart'>
                <ShoppingCart />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item,id) => (
                <Link href={item.href} key={id}>
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    onClick={()=>{resetCurrentNavigation(id)}}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>

              ))}
              <div className='title-input'>
                <input
                  className={'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium'}
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
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}