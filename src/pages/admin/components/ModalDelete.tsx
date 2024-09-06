import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axiosInstance from "../../../helper/axios";

interface Props {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  url: string;
  refreshData: () => void;
  title: string;
}

const ModalDelete: React.FC<Props> = ({
  openModal,
  setOpenModal,
  url,
  refreshData,
  title,
}) => {
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`${url}`);
      toast.success("Successfully!", { duration: 3000 });
      refreshData();
      setOpenModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Body>
        <div className="text-center mt-5">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-700 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to Delete this {title}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={confirmDelete}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDelete;
