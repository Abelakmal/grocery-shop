import { Spinner, Table } from "flowbite-react";
import { TableRow } from "./TableRow";
import { IAdmin } from "../../../../types/admin.type";

interface IParam {
  data: IAdmin[];
  loading: boolean;
  formik: any;
  refreshData: CallableFunction;
}

const TableStoreAdmin = ({ data, loading, refreshData }: IParam) => {
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
          <Table.HeadCell>Admin Name</Table.HeadCell>
          <Table.HeadCell>Admin Email</Table.HeadCell>
          <Table.HeadCell>Branch Store</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((storeAdmin, index) => {
            return (
              <TableRow
                storeAdmin={storeAdmin}
                index={index}
                refreshData={refreshData}
              />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableStoreAdmin;
