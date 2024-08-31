import { Splide, SplideSlide } from "react-splide-ts";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import useGetAllStock from "../../../hooks/stock/useGetAllStock";

const ProductList = () => {
  const { data } = useGetAllStock();


  return (
    <div>
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex justify-between items-center mb-6 my-12">
          <h1 className={` text-lg sm:text-3xl lg:text-4xl mb-0 text-left `}>
            Product Recommendation
          </h1>

          <Link to="/products" className={` md:text-base text-xs hover:underline`}>
            See more
          </Link>
        </div>
        {data && data?.data.length > 0 ? (
          <Splide
            options={{
              perPage: 4,
              perMove: 1,
              type: "loop",
              pagination: false,
              arrows: true,
              gap: 15,
              autoWidth: false,
              breakpoints: {
                1024: {
                  perPage: 3,
                  autoWidth: false,
                },
                768: {
                  perPage: 2,
                  autoWidth: false,
                },
                640: {
                  perPage: 1,
                  autoWidth: false,
                },
              },
            }}
          >
            {data.data?.slice(0, 7).map((product, index) => (
              <SplideSlide key={index}>
                <Link to={`/products/${product.id}`}>
                  <div
                    key={index}
                    className="bg-[#f2f2f2] border rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="w-full h-60 rounded-lg">
                      <img
                        src={product.product.image}
                        alt={product.product.name}
                        className=" rounded-lg object-cover h-[200px] w-full"
                      />
                    </div>
                    <div className={` p-4 text-left`}>
                      <h3 className="text-lg font-semibold h-[3rem] mb-2">
                        {product.product.name}
                      </h3>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 ">
                          {product.product.weight} {product.product.unitWeight}
                        </p>
                        <p className="border-2 p-2 rounded-lg textsm font-medium text-green-400">
                          {product.product.category.name}
                        </p>
                      </div>
                      <div className="flex mb-3 items-center justify-between">
                        <p className="text-lg font-bold  mr-6 text-[#b1bf4c]">
                          {
                            <FormatRupiah
                              value={parseInt(product.product.price)}
                            />
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div className=" w-full flex justify-center my-20">
            <p className="md:text-base text-xs">Product tidak ada di wilayah anda Saat ini {":("}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
