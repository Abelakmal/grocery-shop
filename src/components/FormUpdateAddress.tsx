import { Button, Modal } from "flowbite-react";
import useUpdate from "../hooks/location/useUpdate";
import InputAdress from "./InputAdress";

const FormUpdateAddress = ({ openUpdate, setOpenUpdate, data }: any) => {
  const { formik } = useUpdate(data, setOpenUpdate);
  return (
    <Modal
      size={"6xl"}
      className="md:text-2xl"
      show={openUpdate}
      onClose={() => setOpenUpdate(false)}
    >
      <Modal.Header>
        {" "}
        <h1 className="md:text-4xl">Update Alamat</h1>
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
