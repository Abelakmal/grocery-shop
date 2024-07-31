import { Button, Modal } from "flowbite-react";
import useDelete from "../hooks/location/useDelete";

const DeleteAddress = ({ openDelete, setOpenDelete, id }: any) => {
  const { deleteAddress } = useDelete();

  const handleChange = async (idAddress: number) => {
    await deleteAddress(idAddress);

    setOpenDelete(false);
  };
  return (
    <Modal show={openDelete} size="4xl" popup>
      <Modal.Body>
        <div className="text-center my-4">
          <h1 className="mb-5 md:text-4xl text-lg font-bold ">Hapus Alamat</h1>
          <p className="md:text-xl text-sm">
            Apa anda yakin menghapus alamat? alamat tidak bisa dikembalikan jika
            dihapus.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              color="gray"
              onClick={() => setOpenDelete(false)}
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

export default DeleteAddress;
