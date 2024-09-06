import { Modal } from "flowbite-react";
import { FormikProps } from "formik";

interface FormProps<T> {
  formik: FormikProps<T>;
  setOpenModal: (open: boolean) => void;
  refreshData: () => void;
  method?: string;
}

interface Props<T> {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  Form: React.ComponentType<FormProps<T>>;
  formik: FormikProps<T>;
  judul: string;
  refreshData: () => void;
  method?: string;
}

const ModalInput = <T,>({
  openModal,
  setOpenModal,
  Form,
  formik,
  judul,
  refreshData,
  method,
}: Props<T>) => {
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
