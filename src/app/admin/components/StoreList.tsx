import useGetStores from '@/app/hooks/stores/useGetStores';
import React from 'react';

const StoreList = ({storeId, setStoreId }: any) => {
  const { data } = useGetStores();
  return (
    <div className="mt-12">
      <form>
        <label htmlFor="store">Select Store : </label>
        <select
          name="store"
          id="store"
          className="text-black h-max rounded-lg"
          onChange={(e) => setStoreId(e.target.value)}
          value={storeId}
        >
          {data?.map((store) => {
            return <option key={store.id} value={store.id}>{store.name}</option>;
          })}
        </select>
      </form>
    </div>
  );
};

export default StoreList;
