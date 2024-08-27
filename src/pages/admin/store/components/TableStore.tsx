import { Table } from "flowbite-react";
import { IStoreBranch } from "../../../../types/store.type";

interface props {
  data: IStoreBranch[];
}

const TableStore = ({ data }: props) => {
  return (
    <div className="overflow-x-auto ">
      <Table>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Alamat</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((store, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 text-sm"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {store.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {store.location}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableStore;
