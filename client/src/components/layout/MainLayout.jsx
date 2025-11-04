import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import CategoryNav from './CategoryNav';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <CategoryNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;