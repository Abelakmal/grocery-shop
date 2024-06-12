'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });
const poppins2 = Poppins({ subsets: ['latin'], weight: '400' });

const products = [
  {
    name: 'Brokoli',
    weight: '500 gram',
    price: 'Rp 25.000,00',
    image: '/plum.png',
  },
  {
    name: 'Daging Sapi Import Giling',
    weight: '500 gram',
    price: 'Rp 42.000,00',
    image: '/plum.png',
  },
  {
    name: 'Tempe',
    weight: '250 gram',
    price: 'Rp 8.500,00',
    image: '/plum.png',
  },
  {
    name: 'Susu Ultra Milk 1 Liter',
    weight: '1000 gram',
    price: 'Rp 17.500,00',
    image: '/plum.png',
  },
  {
    name: 'Over item',
    weight: '1000 gram',
    price: 'Rp 17.500,00',
    image: '/plum.png',
  },
  {
    name: 'OVERRR item',
    weight: '1000 gram',
    price: 'Rp 17.500,00',
    image: '/plum.png',
  },
  {
    name: 'OVERRR ITEMSSS',
    weight: '1000 gram',
    price: 'Rp 17.500,00',
    image: '/plum.png',
  },
];

const ProductList = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`${poppins.className} text-2xl sm:text-3xl lg:text-4xl mb-0 text-left`}
          >
            Product Recommendation
          </h1>

          <Link
            href="/products"
            className={`${poppins2.className} text-base hover:underline`}
          >
            See more
          </Link>
        </div>

        <Splide
          options={{
            perPage: 4,
            perMove: 1,
            type: 'loop',
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
          {products.map((product, index) => (
            <SplideSlide key={index}>
              <div
                key={index}
                className="bg-[#f2f2f2] border rounded-lg flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4"
                style={{ minHeight: '400px' }}
              >
                <div className="w-32 h-60 relative mb-3 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={300}
                    className="object-contain"
                  />
                </div>
                <div className={`${poppins2.className} text-left`}>
                  <h3 className="text-lg font-semibold h-[3rem] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-2">{product.weight}</p>
                  <p className="text-lg font-bold text-[#b1bf4c]">
                    {product.price}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default ProductList;
