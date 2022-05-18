// import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';
// import Navbar from 'src/components/Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased h-screen justify-between flex flex-col bg-gradient-to-r from-white to-test-6">
    {props.meta}
    <div>

      <div className="mb-64 content py-5 text-xl">{props.children}</div>

      <footer className="border-t border-gray-300 py-8 text-center text-sm relative">
        © Copyright {new Date().getFullYear()} {AppConfig.author}.
      </footer>
    </div>
  </div>
);

export { Main };
