import AdminNavbar from 'components/Layout/AdminNavbar';
import { RenderSidebar, Sidebar } from 'components/Layout/Sidebar';
import { Routing } from 'layouts/routing';
import React from 'react';

export default function MainLayout({ children }) {
  return (
    <>
      </>
      <div className="relative md:ml-64 h-full">
        <AdminNavbar />

        <div className="p-8 mx-auto w-full h-full 2xl:w-4/5">{children}</div>
      </div>
    </>
  );
}
