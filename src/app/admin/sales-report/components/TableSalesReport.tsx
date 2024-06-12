'use client';

import { IOrder } from '@/app/type.web/order.type';
import { format } from 'date-fns';
import { Table } from 'flowbite-react';
interface IParam {
  order: IOrder;
  index: number;
}

export function TableSalesReport({ order, index }: IParam) {
  return (
    <div className="overflow-x-auto ">
      <Table>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Branch Name</Table.HeadCell>
          <Table.HeadCell>Costumer Name</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Product Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Sold qty</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap">
              {order.StoreBranch.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap">
              {order.customer.profile.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap">
              {order.product.name}
            </Table.Cell>
            <Table.Cell>{order.product.category.name}</Table.Cell>
            <Table.Cell>{order.product.price}</Table.Cell>
            <Table.Cell>{order.qty}</Table.Cell>
            <Table.Cell>{order.amount}</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {format(new Date(order.createdAt), 'dd-LLL-yyyy')}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
