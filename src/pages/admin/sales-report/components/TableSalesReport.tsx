import { format } from "date-fns";
import { Spinner, Table } from "flowbite-react";
import { ITransaction } from "../../../../types/transaction.type";
interface IParam {
  data: ITransaction[];
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
          <Table.HeadCell>Costumer Name</Table.HeadCell>
          <Table.HeadCell>Costumer Email</Table.HeadCell>
          <Table.HeadCell>Costumer Phone</Table.HeadCell>
          <Table.HeadCell>Payment Method</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Sold qty</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((order, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order.id}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap">
                  {order.user.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {order.user.email}
                </Table.Cell>
                <Table.Cell>{order.user.phone}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {order.payment_method}
                </Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>
                  {order.transactions_items.reduce(
                    (rdx: number, data) => rdx + data.quantity,
                    0
                  )}
                  +
                </Table.Cell>
                <Table.Cell>{order.total}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {format(new Date(order.createdAt), "dd-LLL-yyyy")}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
