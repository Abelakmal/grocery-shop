import { Button, Modal } from "flowbite-react";
import useUpdate from "../hooks/location/useUpdate";
import InputAdress from "./InputAdress";
import React from "react";
import { IAddress } from "../types/address.type";

interface Props {
  openUpdate: boolean;
  setOpenUpdate: (open: boolean) => void;
  data: IAddress;
  refreshData: () => void;
}

const FormUpdateAddress: React.FC<Props> = ({
  openUpdate,
  setOpenUpdate,
  data,
  refreshData,
}) => {
  const { formik } = useUpdate(refreshData, data, setOpenUpdate);
  return (
    <Modal
      size={"6xl"}
      className="md:text-2xl"
      show={openUpdate}
      onClose={() => setOpenUpdate(false)}
    >
      <Modal.Header>
        {" "}
        <span className="md:text-4xl">Update Alamat</span>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <InputAdress formik={formik} />
          <div className="w-full flex justify-center mt-10">
            <Button type="submit" color={"success"}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormUpdateAddress;
