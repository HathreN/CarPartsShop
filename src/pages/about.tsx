import { imageUrl } from '@/utils/Image';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AnnotationIcon,
  },
]

const About = () => {
  // interface Category {
  //   id: string;
  //   name: string;
  //   link: string;
  //   image: string;
  // }
  const router = useRouter();
  // let categories: Category[] = [
  //   {
  //     id: '1',
  //     name: 'gwint',
  //     link: '/category/gwint',
  //     image: '/gwint.jpg'
  //   },
  //   {
  //     id: '2',
  //     name: 'hydro',
  //     link: '/category/hydro',
  //     image: '/hydro.jpg'
  //   },
  //   {
  //     id: '3',
  //     name: 'shifter',
  //     link: '/category/shifter',
  //     image: '/shifter.jpg'
  //   },
  //   {
  //     id: '4',
  //     name: 'wnetrze',
  //     link: '/category/wnetrze',
  //     image: '/wnetrze.jpg'
  //   }
  // ];
  // interface Part {
  //   properties:{
  //     id: string;
  //     name: string;
  //     image: string;
  //     carBrand?: string;
  //     price: number;
  //     },
  //   link: string;
  // }

  // let Parts: Part[] = [
  //   {
  //     properties: {
  //       id: '1',
  //       name: 'feal suspensin',
  //       image: '/gwint.jpg',
  //       carBrand: 'BMW',
  //       price: 1200,
  //     },
  //     link: '/part'
  //   },
  //   {
  //     properties: {
  //       id: '2',
  //       name: 'hydro śwagier',
  //       image: '/hydro.jpg',
  //       price: 1200,
  //     },
  //     link: '/part'
  //   },
  //   {
  //     properties:{
  //       id: '3',
  //       name: 'short shifter',
  //       image: '/shifter.jpg',
  //       carBrand: 'BMW e36',
  //       price: 1000,
  //     },
  //     link: '/part'
  //   },
  //   {
  //     properties: {
  //       id: '4',
  //       name: 'podstopnica',
  //       image: '/wnetrze.jpg',
  //       carBrand: 'BMW e30',
  //       price: 420},
  //     link: '/part'
  //   },
  // ];
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
            <a href={"/signin"} className="font-medium text-indigo-600 hover:text-indigo-500">
              Zaloguj się
            </a>
          </div>
        </nav>
      </div>
    </Popover>
      <div className="mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to send money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default About;

