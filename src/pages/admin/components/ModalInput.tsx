import { Modal } from "flowbite-react";

const ModalInput = ({
  openModal,
  setOpenModal,
  Form,
  formik,
  judul,
  refreshData,
  method,
}: any) => {
  return (
    <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
      <Modal.Body>
        <div className="space-y-6 mt-5">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {judul}
          </h3>
          <Form
            setOpenModal={setOpenModal}
            formik={formik}
            refreshData={refreshData}
            method={method}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalInput;
