import { Table } from "flowbite-react";
import { IStock } from "../../../../types/stock.type";
import RowStock from "./RowStock";
import React from "react";

interface props {
  stocks: IStock[];
  refreshData: () => void;
  loading:boolean
}

export const TableStocks: React.FC<props> = ({ stocks, refreshData,loading }) => {
  return (
    <div className="overflow-x-auto mt-10">
      <Table>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Date Created</Table.HeadCell>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>
            <span>Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y ">
        {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            : stocks.map((stock: IStock) => (
                <RowStock
                  stock={stock}
                  refreshData={refreshData}
                  key={stock.id}
                />
              ))}
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