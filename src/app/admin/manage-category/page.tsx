import React from 'react';
import { SidebarAdmin } from '../components/SideBarAdmin';
import CategoryPage from './components/CategoryPage';

const ManageCategoryPage = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <CategoryPage />
    </div>
  );
};

export default ManageCategoryPage;
