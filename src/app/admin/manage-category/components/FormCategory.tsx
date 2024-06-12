import { Button } from 'flowbite-react';
import React from 'react';
import InputFields from '../../manage-product/components/InputFields';

const FormCategory = ({ setOpenModal, formik }: any) => {
  return (
    <form
      className="flex flex-col items-center text-sm"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-[80%]">
        <InputFields
          label="Product Name"
          name="name"
          id="name"
          formik={formik}
        />
      </div>

      <div className="mt-3 w-[80%]">
        <label htmlFor="image">Product image</label>
        <input
          type="file"
          className="border-2 mt-2 border-solid w-full"
          id="image"
          name="image"
          onChange={(event) => {
            if (event.currentTarget.files) {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button color="success" type="submit">
          Submit
        </Button>
        <Button color="light" onClick={() => setOpenModal(false)}>
          cancel
        </Button>
      </div>
    </form>
  );
};

export default FormCategory;
