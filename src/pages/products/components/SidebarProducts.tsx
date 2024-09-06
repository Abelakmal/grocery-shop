import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../../types/category.type";
import useGetAllCategory from "../../../hooks/categories/useGetAllCategory";
import { useLocation } from "react-router-dom";

interface Props {
  setFilterCategory: (filter: ICategory[]) => void;
  showSide: boolean;
  setShowSide: (open: boolean) => void;
}

export const SidebarProducts: React.FC<Props> = ({
  setFilterCategory,
  showSide,
  setShowSide,
}) => {
  const [filter, setFilter] = useState<ICategory[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = parseInt(searchParams.get("categoryId") as string);
  const name = searchParams.get("name");

  const handleChecked = useCallback(
    (id: number, name: string) => {
      let dataFilter = [...filter];
      const isExist = dataFilter?.find((data) => data.name === name);
      if (isExist) {
        dataFilter = dataFilter?.filter((value) => value?.name !== name);
      } else {
        if (dataFilter?.length <= 3) dataFilter?.push({ id, name });
      }
      setFilterCategory(dataFilter);
      setFilter(dataFilter);
    },
    [filter, setFilterCategory]
  );

  const handleRemoveFilter = (name: string) => {
    const remove = [...filter];
    const result = remove.filter((val) => val.name !== name);
    setFilter(result);
    setFilterCategory(result);
  };

  const [dropDown, setDropdown] = useState(false);
  const { data } = useGetAllCategory();

  useEffect(() => {
    if (categoryId && name) {
      handleChecked(categoryId, name);
    }
  }, [categoryId, handleChecked, name]);
  return (
    <div
      className={`p-3 h-screen   bg-[#4a5765] text-white ${
        showSide ? "fixed" : "hidden"
      } z-50 w-full  `}
    >
      <div className="flex">
        {filter?.map((value: ICategory, index: number) => {
          return (
            <div key={index}>
              {value.id !== 0 && (
                <p
                  className="text-sm mr-2 bg-[#77818b] p-1 rounded whitespace-nowrap"
                  onClick={() => handleRemoveFilter(value.name)}
                >
                  <span className="text-black">x </span>
                  {value.name}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <h1
          className={` cursor-pointer`}
          onClick={() => setDropdown(!dropDown)}
        >
          Product <span className="text-[#b1bf4c]">Category</span>
          <span className="ml-2 text-xl font-bold">{dropDown ? "+" : "-"}</span>
        </h1>
        <h1
          className="text-xl cursor-pointer"
          onClick={() => setShowSide(false)}
        >
          X
        </h1>
      </div>

      <div className={`  ${dropDown ? "hidden" : "block"}`}>
        {data &&
          data.map((value) => {
            return (
              <div
                key={value.id}
                className="flex items-center me-4 my-6 cursor-pointer hover:bg-[#374151] rounded-lg p-1"
                onClick={() =>
                  handleChecked(value?.id, value?.name as string)
                }
              >
                <div className="flex justify-between w-full">
                  <p
                    className={`ms-2 text-sm   font-medium dark:text-gray-300`}
                  >
                    {value.name}
                  </p>
                  <span className="text-[12px] text-gray-400">
                    {value.product?.length}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <h2 className={` mt-5`}>
        Filter <span className="text-[#b1bf4c]">Price</span>
      </h2>
      <form>
        <div className="my-3">
          <input
            type="number"
            placeholder="Price Max"
            className="rounded-lg text-black p-2"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price Min"
            className="rounded-lg text-black p-2"
          />
        </div>
      </form>
    </div>
  );
};
