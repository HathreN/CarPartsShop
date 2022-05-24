import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import ShoppingCart from '@/components/shoppingCart';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Link from 'next/link';
const navigation = [
  { name: 'Bestsellery', href: '/bestsellers' },
  { name: 'Kategorie', href: '/categories' },
  { name: 'Outlet', href: '/outlet' },
  { name: 'O nas', href: '/about' },
]
export default function Navbar({}) {
  const { user } = useUser();
 const router = useRouter()
  const [empty, setEmpty] = useState(false)

  return (
    <Popover>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="/">
                <span className="sr-only">Workflow</span>
                <img className="h-8 w-auto sm:h-10 rounded-full" src={imageUrl(router, '/logo.jpg')} alt="cos" />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8 font-medium text-gray-500 hover:text-gray-900">
            {navigation.map((item) => (
              <Link href={{
                pathname: item.href
              }} key={item.name}>{item.name}</Link>
            ))}

            {(user) ? (
              <a href={"/api/auth/logout"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Wyloguj się
              </a>) : (
              <a href={"/api/auth/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Zaloguj się
              </a>
            )}
          </div>
        <div className="flex items-center sm:h-10 lg:justify-start" aria-label="Global">
          {!empty &&
            <ShoppingCart />
          }
        </div>
        </nav>
      </div>
    </Popover>
  )
}
