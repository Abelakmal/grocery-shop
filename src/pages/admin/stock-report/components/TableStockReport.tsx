import { format } from "date-fns";
import { Table } from "flowbite-react";
import { IHistoryStock } from "../../../../types/stock.type";

interface IParam {
  data: IHistoryStock[];
  loading: boolean;
}

export const TableStockReport = ({ data, loading }: IParam) => {
  
  if (loading) {
    return (
      <div className="h-screen w-full ">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  No
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Branch Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Product Category
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Stock Before
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Stock After
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Date Created
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white">
                  Date Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <Table>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Branch Name </Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Product Category</Table.HeadCell>
          <Table.HeadCell>Stock Before</Table.HeadCell>
          <Table.HeadCell>Stock After</Table.HeadCell>
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>Date Updated</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((historyStock, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {historyStock.id}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.storeBranch.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.product.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stock?.product.category.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stockBefore}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {historyStock.stockAfter}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {format(new Date(historyStock.createdAt), "dd-LLL-yyyy")}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {format(new Date(historyStock.updatedAt), "dd-LLL-yyyy")}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};
