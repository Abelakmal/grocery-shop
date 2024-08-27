
import { format } from 'date-fns';
import { Spinner, Table } from 'flowbite-react';
import { IOrder } from '../../../../types/order.type';
interface IParam {
  data: IOrder[];
  loading: boolean;
}

export function TableSalesReport({ data, loading }: IParam) {
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }
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
          {data.map((order, index) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
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
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
