/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext, useEffect, useState } from 'react';
import CartContext from '@/context/CartContext';
import { IAddToCart } from '@/types/cart.type';
import Link from 'next/link';
const Cart = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(25000);
  const [tax, setTax] = useState(10000);
  const [total, setTotal] = useState(0);
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

  useEffect(() => {
    const calculateTotals = () => {
      let subTotal = 0;

      cart?.cartItems?.forEach((cartItem: IAddToCart) => {
        subTotal += cartItem.price * cartItem.quantity;
      });

      const newSubtotal = subTotal.toFixed(2);
      const newTotal = (subTotal + shipping + tax).toFixed(2);

      setSubtotal(Number(newSubtotal));
      setTotal(Number(newTotal));
    };

    calculateTotals();
  }, [cart, shipping, tax]);

  const incrementQty = (cartItem: IAddToCart) => {
    const newQuantity = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQuantity };

    if (newQuantity > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const decrementQty = (cartItem: IAddToCart) => {
    const newQuantity = cartItem.quantity - 1;
    const item = { ...cartItem, quantity: newQuantity };

    if (newQuantity <= 0) return;
    addItemToCart(item);
  };

  return (
    <>
      <div className="font-[sans-serif] bg-white py-4">
        <div className="max-w-7xl mx-auto">
          {cart?.cartItems?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="mt-12 w-full border-collapse divide-y">
                <thead className="whitespace-nowrap text-left">
                  <tr>
                    <th className="text-base text-gray-500 p-4">Product</th>
                    <th className="text-base text-gray-500 p-4">Seller</th>
                    <th className="text-base text-gray-500 p-4">Price</th>
                    <th className="text-base text-gray-500 p-4">Quantity</th>
                    <th className="text-base text-gray-500 p-4">Total</th>
                    <th className="text-base text-gray-500 p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap divide-y">
                  {cart?.cartItems?.map(
                    (cartItem: IAddToCart, index: number) => (
                      <tr key={index}>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-6 w-max">
                            <div className="h-36 shrink-0">
                              <img
                                src={cartItem.image}
                                alt={cartItem.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-[#333]">
                                {cartItem.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <p className="font-bold">{cartItem.seller}</p>
                        </td>
                        <td className="py-6 px-4">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(cartItem.price)}
                        </td>

                        <td className="py-6 px-4">
                          <div className="flex divide-x border w-max">
                            <button
                              type="button"
                              className="bg-gray-100 px-4 py-2 font-semibold"
                              onClick={() => decrementQty(cartItem)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 fill-current"
                                viewBox="0 0 124 124"
                              >
                                <path
                                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md"
                            >
                              {cartItem.quantity}
                            </button>
                            <button
                              type="button"
                              className="bg-gray-800 text-white px-4 py-2 font-semibold"
                              onClick={() => incrementQty(cartItem)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 fill-current"
                                viewBox="0 0 42 42"
                              >
                                <path
                                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <button
                            type="button"
                            className="text-lg font-bold text-[#333]"
                          >
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(cartItem.price * cartItem.quantity)}
                          </button>
                        </td>
                        <td className="py-6 px-4">
                          <a
                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              deleteItemFromCart(cartItem?.productId)
                            }
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className=" max-w-xl ml-auto mt-6">
            <ul className="text-[#333] divide-y">
              <li className="flex flex-wrap gap-4 text-md py-3">
                Subtotal{' '}
                <span className="ml-auto font-bold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(subtotal)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3">
                Shipping{' '}
                <span className="ml-auto font-bold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(shipping)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3">
                Tax{' '}
                <span className="ml-auto font-bold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(tax)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-3 font-bold">
                Total{' '}
                <span className="ml-auto">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(total)}
                </span>
              </li>
            </ul>
            <Link href="/checkout">
              <button
                type="button"
                className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
