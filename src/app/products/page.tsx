'use client';
import NavbarComp from '@/components/NavbarComp';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ProductsPage from './components/ProductsPage';
import MobileNavBar from '@/components/MobileNavBar';

const Products = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  return (
    <div>
      <NavbarComp />
      <ProductsPage categoryId={categoryId} />
      <MobileNavBar />
    </div>
  );
};

export default Products;
