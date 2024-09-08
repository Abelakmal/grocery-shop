import React, { useState } from "react";
import { IAddress } from "../types/address.type";
import { Button, Modal } from "flowbite-react";
import FormUpdateAddress from "./FormUpdateAddress";
import ChangeMainAddress from "./ChangeMainAddress";
import DeleteAddress from "./DeleteAddress";

interface Props {
  setOpenAddLocation: (open: boolean) => void;
  address: IAddress[];
  refreshData: () => void;
}

const ViewAddress: React.FC<Props> = ({
  setOpenAddLocation,
  address,
  refreshData,
}) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openChangeMain, setOpenChangeMain] = useState(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [data, setData] = useState<IAddress | null>();
  const [id, setId] = useState<number>();

  const handleUpdate = (data: IAddress) => {
    setOpenUpdate(true);
    setData(data);
  };

  const handleChangeMain = (idAddress: number) => {
    setOpenChangeMain(true);
    setId(idAddress);
  };
  const handleDelete = (idAddress: number) => {
    setOpenDelete(true);
    setId(idAddress);
  };

  return (
    <div>
      {address?.length > 0 ? (
        <>
          {address.map((data, index) => {
            return (
              <div
                className={`border-2 border-green-500 mb-4 p-4 rounded-md ${
                  data.main && "bg-green-100"
                }`}
                key={index}
              >
                <div className="flex items-center">
                  <h2 className="font-semibold md:text-lg text-[12px]">
                    {data.label}
                  </h2>{" "}
                  <p className="ml-4 text-black md:text-lg text-[12px] bg-gray-400 px-2   rounded-md">
                    {data.main && "Utama"}
                  </p>
                </div>
                <p className="md:text-2xl text-[12px] font-bold mt-2 capitalize">
                  {data.recipient_name}
                </p>
                <p className="md:text-xl text-[10px] my-2">{data.recipient_number}</p>
                <p className="md:text-xl text-[10px]">{data.details}</p>
                <ul className="flex items-center mt-6  font-semibold justify-around text-green-600">
                  <li
                    className="cursor-pointer text-[10px] md:text-base"
                    onClick={() => handleUpdate(data)}
                  >
                    Ubah Alamat
                  </li>
                  {!data.main && (
                    <li
                      className="cursor-pointer text-[10px] md:text-base"
                      onClick={() => handleChangeMain(data.id as number)}
                    >
                      Jadikan Utama Dan Pilih
                    </li>
                  )}
                  {!data.main && (
                    <li
                      className="cursor-pointer text-[10px] md:text-base"
                      onClick={() => handleDelete(data.id as number)}
                    >
                      Hapus
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </>
      ) : (
        <p className="w-full flex justify-center items-center h-44">
          Tidak Ada Alamat
        </p>
      )}
      <Modal.Footer>
        <Button
          color={"success"}
          onClick={() => setOpenAddLocation(true)}
          className="border-2 p-2 rounded-lg w-full text-lg  font-semibold "
        >
          Add Location
        </Button>
      </Modal.Footer>
      {openUpdate && data && (
        <FormUpdateAddress
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          data={data}
          refreshData={refreshData}
        />
      )}
      {openChangeMain && id && (
        <ChangeMainAddress
          openChangeMain={openChangeMain}
          setOpenChangeMain={setOpenChangeMain}
          id={id}
          refreshData={refreshData}
        />
      )}
      {openDelete && id && (
        <DeleteAddress
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          id={id}
          refreshData={refreshData}
        />
      )}
    </div>
  );
};

export default ViewAddress;
