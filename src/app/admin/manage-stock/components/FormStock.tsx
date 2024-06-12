import React from 'react';
import InputFields from '../../manage-product/components/InputFields';
import { Button } from 'flowbite-react';

const FormStock = ({ setOpenModal, formik }: any) => {
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
