import {Meta} from '@/layouts/Meta';
import {Main} from '@/templates/Main';
import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline'

const Tescik = () => {
  interface Category {
    id: string;
    name: string;
    link: string;
    image: string;
  }
  const router = useRouter();
  let categories: Category[] = [
    {
      id: '1',
      name: 'gwint',
      link: '/category/gwint',
      image: '/gwint.jpg'
    },
    {
      id: '2',
      name: 'hydro',
      link: '/category/hydro',
      image: '/hydro.jpg'
    },
    {
      id: '3',
      name: 'shifter',
      link: '/category/shifter',
      image: '/shifter.jpg'
    },
    {
      id: '4',
      name: 'wnetrze',
      link: '/category/wnetrze',
      image: '/wnetrze.jpg'
    }
  ];
  interface Part {
    properties:{
      id: string;
      name: string;
      image: string;
      carBrand?: string;
      price: number;
    },
    link: string;
  }

  let Parts: Part[] = [
    {
      properties: {
        id: '1',
        name: 'feal suspensin',
        image: '/gwint.jpg',
        carBrand: 'BMW',
        price: 1200,
      },
      link: '/part'
    },
    {
      properties: {
        id: '2',
        name: 'hydro śwagier',
        image: '/hydro.jpg',
        price: 1200,
      },
      link: '/part'
    },
    {
      properties:{
        id: '3',
        name: 'short shifter',
        image: '/shifter.jpg',
        carBrand: 'BMW e36',
        price: 1000,
      },
      link: '/part'
    },
    {
      properties: {
        id: '4',
        name: 'podstopnica',
        image: '/wnetrze.jpg',
        carBrand: 'BMW e30',
        price: 420},
      link: '/part'
    },
  ];
  const navigation = [
    { name: 'Bestsellery', href: '/bestsellers' },
    { name: 'Kategorie', href: '/categories' },
    { name: 'Outlet', href: '/outlet' },
    { name: 'O nas', href: '/about' },
  ]
  return (
    <div>
      <Popover>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
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
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              ))}
              <a href={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Zaloguj się
              </a>
            </div>
          </nav>
        </div>
      </Popover>
      <Main meta={<Meta title="Site for practicing" description="Site description" />}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen gap-4 p-3 m-4 rounded-xl bg-test-3 shadow-xl">
          { categories.map((category) => (
            <Link href={{
              pathname: category.link,
              query: category.id
            }} key={category.id}>
              <div className="relative rounded-xl hover:border-2 hover:border-test-5 hover:shadow-2xl hover:shadow-test-4">
                <img className="w-full rounded-xl" src={imageUrl(router, category.image)} alt="cos" />
                <div className='flex px-4 justify-between absolute bottom-0 left-0 text-white bg-test-2 bg-opacity-40 w-full h-20 rounded-b-xl'>
                  <p className="text-test-1">{category.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <header className="rounded-full hover:shadow-xl shadow-xl hover:shadow-amber-300 text-test-1 text-center bg-test-5 w-40">Bestsellers</header>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen gap-4 p-3 m-4 rounded-xl bg-test-3 shadow-xl ">
          { Parts.map((part) => (
            <Link href={{
              pathname: part.link,
              query: part.properties
            }} key={part.properties.id}>
              <div className="relative rounded-xl hover:border-2 hover:border-test-5 hover:shadow-2xl hover:shadow-test-4">
                <img className="w-full rounded-xl" src={imageUrl(router, part.properties.image)} alt="cos" />
                <div className='flex px-4 justify-between absolute bottom-0 left-0 text-white bg-test-2 bg-opacity-40 w-full h-20 rounded-b-xl'>
                  <p className="text-test-1">{part.properties.name}</p>
                  <p className="text-test-1">cena: {part.properties.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Main>
    </div>
  );
}

export default Tescik;