'use client';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import { useEffect, useState } from 'react';
import NavbarComp from '@/components/NavbarComp';
import MobileNavBar from '@/components/MobileNavBar';

const ProductDetailPage = ({ params }: any) => {


  return (
    <>
      <NavbarComp />
      <ProductDetails id={params.id} />
      <MobileNavBar />
    </>
  );
};

export default ProductDetailPage;
