import { Button, Modal } from "flowbite-react";
import useChangeMain from "../hooks/location/useChangeMain";

const ChangeMainAddress = ({
  openChangeMain,
  setOpenChangeMain,
  id,
}: any) => {
  const { change } = useChangeMain();

  const handleChange = async (id: number) => {
    await change(id);

    setOpenChangeMain(false);
  };
  return (
    <Modal show={openChangeMain} size="4xl" popup>
      <Modal.Body>
        <div className="text-center my-4">
          <h1 className="mb-5 md:text-4xl text-lg font-bold">
            Apakah Yakin Dijadikan Utama ?
          </h1>
          <p className="md:text-xl text-sm">Anda hanya dapat memilih satu alamat utama</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              color="gray"
              onClick={() => setOpenChangeMain(false)}
              className="font-bold"
            >
              Batal
            </Button>
            <Button
              color="success"
              onClick={() => handleChange(id)}
              className="font-bold"
            >
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeMainAddress;
