import { useGetStore } from "../../../hooks/store/useGetStore";


const StoreList = ({ storeId, setStoreId }: any) => {
  const { data } = useGetStore();
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
          <option value={"0"}>Select</option>
          {data?.map((store) => {
            return (
              <option key={store.id} value={store.id as number}>
                {store.name}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default StoreList;
