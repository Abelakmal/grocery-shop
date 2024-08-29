import { Table } from "flowbite-react";
import ModalInput from "../../components/ModalInput";
import { useState } from "react";
import FormStock from "./FormStock";
import { IStock } from "../../../../types/stock.type";
import useUpdateStock from "../../../../hooks/stock/useUpdateStock";

export function TableStocks({ stocks, refreshData }: any) {
  return (
    <div className="overflow-x-auto mt-10">
      <Table>
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>
            <span>Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y ">
          {stocks.map((stock: IStock, index: number) => {
            const [openUpdate, setOpenUpdate] = useState(false);
            const formik = useUpdateStock(stock, refreshData, setOpenUpdate);
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {stock.product.name}
                </Table.Cell>
                <Table.Cell>{stock.product.category.name}</Table.Cell>
                <Table.Cell>{stock.product.price}</Table.Cell>
                <Table.Cell>{stock.amount}</Table.Cell>
                <Table.Cell>
                  <button
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => setOpenUpdate(true)}
                  >
                    Edit
                  </button>
                </Table.Cell>
                <ModalInput
                  stock={stock}
                  openModal={openUpdate}
                  setOpenModal={setOpenUpdate}
                  Form={FormStock}
                  formik={formik}
                  refreshData={refreshData}
                  judul="Update Stock"
                />
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
