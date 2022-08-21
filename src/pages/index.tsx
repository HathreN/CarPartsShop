// import { imageUrl } from '@/utils/Image';
// import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import React from 'react';
import Link from 'next/link';

const Index = () => {
  // const router = useRouter();
  return (
    <div className="relative bg-white overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 mt-32 pt-1 bg-amber-100 sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-14 xl:pb-16 rounded-2xl">
          {/*Branding indent image*/}
          <svg
            className="hidden lg:block absolute bg-amber-100 right-0 inset-y-0 h-full w-48 text-indigo-600 transform translate-x-3/4 rounded-br-2xl rounded-tr-2xl"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="100,0 100,0 100,100 0,100" />
          </svg>

          <Navbar />

          <main className="pt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center lg:text-left ">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
                <span className="inline-flex overflow-x-hidden animate-type2 whitespace-nowrap">Internetowy sklep dla twojego</span>{' '}
              </h1>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-4xl">
                <span className="inline-flex overflow-x-hidden animate-type whitespace-nowrap text-indigo-600">projektu motorsportowego</span>
              </h1>
              <h1 className="mt-3 text-base text-gray-900 font-semibold sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl overflow-x-hidden animate-show ">
                Nasz sklep pozwoli ci na zakup wszystkich potrzebnych części w łatwy i co w dzisiejszych czasach najważniejsze szybki sposób
              </h1>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow animate-showButton">
                  <div className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 cursor-pointer'>
                    <Link
                      href="/categories"
                    >
                      <text>Zacznij przeglądać</text>
                    </Link>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 animate-showButton2">
                  <a
                    href={"/api/auth/login"}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Utwórz konto
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/*<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">*/}
      {/*  <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={imageUrl(router, '/navbar.jpg')} alt="cos" />*/}
      {/*</div>*/}
    </div>
  );
};
export default Index;

