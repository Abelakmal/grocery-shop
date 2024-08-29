import { useGetStore } from "../../../hooks/store/useGetStore";


const StoreList = ({ storeId, setStoreId }: any) => {
  const { data } = useGetStore();
  return (
    <div className="md:mt-12 mt-4 text-[12px] md:text-xl">
      <form>
        <label htmlFor="store">Select Store : </label>
        <select
          name="store"
          id="store"
          className="text-black h-max rounded-lg text-[12px] md:text-xl"
          onChange={(e) => setStoreId(e.target.value)}
          value={storeId || "0"}
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
