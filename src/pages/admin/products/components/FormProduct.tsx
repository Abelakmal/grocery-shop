import { Button } from "flowbite-react";
import useGetAllCategory from "../../../../hooks/categories/useGetAllCategory";
import InputFields from "../../components/InputFields";
import React, { ChangeEvent } from "react";
import { FormikProps } from "formik";
import { IFormProduct } from "../../../../types/product.type";

interface Props {
  formik: FormikProps<IFormProduct>;
  setOpenModal: (open: boolean) => void;
}

const FormProduct: React.FC<Props> = ({ setOpenModal, formik }) => {
  const { data } = useGetAllCategory();

  const formatNumber = (value: string) => {
    if (!value) return "";
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const formattedNumber = formatNumber(input);
    formik.setFieldValue("price", formattedNumber);
  };

  return (
    <form
      className="flex flex-col items-center md:text-sm text-[12px]"
      onSubmit={formik.handleSubmit}
    >
      <div className="md:w-[80%] w w-full">
        <InputFields
          label="Product Name"
          name="name"
          id="name"
          formik={formik}
        />
      </div>
      <div className="mt-3 md:w-[80%] w-full">
        <label htmlFor="categories">Select Category</label> <br />
        <select
          name="categoryId"
          id="categories"
          className="w-full rounded-sm mt-2"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="0">Select Category</option>
          {data?.map((value) => {
            return (
              <option value={`${value.id}`} key={value.id}>
                {value.name}
              </option>
            );
          })}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.categoryId}
          </p>
        )}
      </div>
      <div className="mt-3 md:w-[80%] w-full">
        <label htmlFor="description">Product Description</label>
        <br />
        <textarea
          name="description"
          id="description"
          className="w-full mt-2"
          rows={5}
          maxLength={191}
          style={{ resize: "none" }}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>
      <div className="mt-3 flex mx-12 md:w-[80%] w-full">
        <div className="w-1/2 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span
              className={`text-gray-500 sm:text-sm ${
                formik.errors.price || formik.errors.weight ? "-mt-4" : "mt-4"
              }`}
            >
              Rp
            </span>
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              name="price"
              onChange={(event) => handleInput(event)}
              className={`bg-gray-50 border mt-2 pl-12 border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                formik.touched["price"] && formik.errors["price"]
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.price}
            />
          </div>
        </div>
        <div className="w-1/2 ml-2 flex">
          <div className="w-[50%] ml-2">
            <InputFields
              formik={formik}
              name="weight"
              label="Weight"
              className="text-xs"
              type="number"
            />
          </div>
          <div>
            <label htmlFor="unit">unit</label>
            <br />
            <select
              name="unitWeight"
              id="unit"
              className="bg-gray-50 border mt-2 border-gray-400 px-2 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              value={formik.values.unitWeight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="GRAM">GRAM</option>
              <option value="KG">KG</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-3 md:w-[80%] w-full">
        <label htmlFor="image">Product image</label>
        <input
          type="file"
          className="border-2 mt-2 border-solid w-full"
          id="image"
          name="image"
          onChange={(event) => {
            if (event.currentTarget.files) {
              formik.setFieldValue("image", event.currentTarget.files[0]);
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

export default FormProduct;
