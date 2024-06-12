'use client';
import { useGetStockByIdStore } from '@/app/hooks/stocks/useGetStockByIdStore';
import { Spinner } from 'flowbite-react';
import { Roboto } from 'next/font/google';
import React, { useState } from 'react';
import { TableProducts } from './TableProducts';
import StoreList from '../../components/StoreList';

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
});

const StockPage = () => {
  const [storeId, setStoreId] = useState(1);
  const { data, loading, refreshData } = useGetStockByIdStore(storeId);

  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-10 py-10 bg-[#272c2f] text-white">
      <h1 className={`${roboto.className} text-3xl`}>Manage Stock </h1>
      <StoreList storeId={storeId} setStoreId={setStoreId} />
      {data ? (
        <TableProducts stocks={data} refreshData={refreshData} />
      ) : (
        <>No Products</>
      )}
    </div>
  );
};

export default StockPage;
