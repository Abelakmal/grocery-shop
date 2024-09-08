import { ICategory } from "../../../types/category.type";
import useGetAllCategory from "../../../hooks/categories/useGetAllCategory";
import { Link } from "react-router-dom";

const Category = () => {
  const { data } = useGetAllCategory();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 pt-20 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className={` text-base sm:text-3xl  text-left`}>
            Market Categories
          </h1>

          <Link
            to="/products"
            className={` md:text-base text-xs hover:underline`}
          >
            See more
          </Link>
        </div>
        <div className="flex overflow-x-scroll gap-4 no-scrollbar">
          {data?.length > 0 && (
            <>
              {data?.slice(0, 6).map((category: ICategory, index) => (
                <Link
                  key={index}
                  to={`/products?categoryId=${category.id}&name=${category.name}`}
                >
                  <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="bg-white  rounded-lg shadow-md transform transition duration-300 hover:shadow-lg max-md:w-32">
                      <img
                        src={category?.image || ""}
                        alt={category?.name || ""}
                      />
                    </div>
                    <span className={` mt-2 text-[#848484]`}>
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
