'use client';
import Cart from './components/Cart';

const Cartpage = () => {
  return (
    <div>
      <div className="bg-[#f4faf5] flex justify-center items-center h-20 md:h-40">
        <h1 className="text-3xl font-bold">Cart</h1>
      </div>
      <div className="container max-w-7xl mx-auto py-10 md:py-20 px-5">
        <Cart />
      </div>
    </div>
  );
};

export default Cartpage;
