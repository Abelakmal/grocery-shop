'use client';
import React, { useState } from 'react';
import SidebarProducts from './SidebarProducts';
import ListProducts from './ListProducts';

const ProductsPage = ({ categoryId }: any) => {
  const [filterCategory, setFilterCategory] = useState<[]>([]);
  return (
    <div className="flex bg-[url('/background.png')] bg-no-repeat bg-cover ">
      <SidebarProducts setFilterCategory={setFilterCategory} />
      <ListProducts filterCategory={filterCategory}/>
    </div>
  );
};

export default ProductsPage;
