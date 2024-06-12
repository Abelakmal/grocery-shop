import React from 'react';
import { SidebarAdmin } from '../components/SideBarAdmin';
import StockPage from './components/StockPage';

const ManageStockPage = () => {
  return (
    <div className='flex'>
      <SidebarAdmin />
      <StockPage />
    </div>
  );
};

export default ManageStockPage;
