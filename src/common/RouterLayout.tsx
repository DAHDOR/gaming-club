import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RouterLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RouterLayout;
