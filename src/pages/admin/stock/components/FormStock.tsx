import InputFields from "../../components/InputFields";
import { Button } from "flowbite-react";
import { FormikProps } from "formik";
import React from "react";

interface FormProps<T> {
  formik: FormikProps<T>;
  setOpenModal: (open: boolean) => void;
}

const FormStock: React.FC<FormProps<{ amount: number }>> = ({
  setOpenModal,
  formik,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputFields
        label="amount"
        type="number"
        id="amount"
        name="amount"
        formik={formik}
      />
      <div className="flex justify-center">
        <Button type="submit" color="success" className="mr-4">
          Submit
        </Button>
        <Button type="button" color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FormStock;
