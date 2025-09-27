import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import CategoryNav from './CategoryNav';

const MainLayout = () => {
  return (
    <>
      <Header />
      <CategoryNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;