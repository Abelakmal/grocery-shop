import { Button, Spinner } from "flowbite-react";
import InputFields from "../../components/InputFields";
import { useGetStore } from "../../../../hooks/store/useGetStore";
import React from "react";
import { FormikProps } from "formik";
import { IFormAdmin } from "../../../../types/admin.type";
interface Props {
  formik: FormikProps<IFormAdmin>;
  setOpenModal: (open: boolean) => void;
  method?: string;
}

const FormStoreAdmin: React.FC<Props> = ({ formik, setOpenModal, method }) => {
  const { data, loading } = useGetStore();
  if (loading) {
    return (
      <div className="h-sceen w-full flex justify-center items-center bg-[#272c2f]">
        <Spinner aria-label="Extra large spinner example" size="xl" />
        <p className="ml-2 text-white">Loading...</p>
      </div>
    );
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("storeId", parseInt(event.target.value, 0));
  };

  return (
    <form
      className="flex flex-col items-center text-sm"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-[80%]">
        <InputFields label="Name" name="name" id="name" formik={formik} />
      </div>
      <div className="w-[80%]">
        <InputFields
          label="Email"
          name="email"
          id="email"
          type="email"
          formik={formik}
        />
      </div>
      <div className="mt-3 w-[80%]">
        <label htmlFor="stores">Select Store Branch</label> <br />
        <select
          name="storeId"
          id="stores"
          className="w-full rounded-sm mt-2"
          value={formik.values.storeId}
          onChange={handleSelectChange}
          onBlur={formik.handleBlur}
        >
          <option value={"0"}>select</option>
          {data?.map((value) => {
            return (
              <option value={`${value.id}`} key={value.id}>
                {value.name}
              </option>
            );
          })}
        </select>
        {formik.touched.storeId && formik.errors.storeId && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.storeId}</p>
        )}
      </div>
      {method !== "put" && (
        <div className="w-[80%]">
          <InputFields
            label="Password"
            name="password"
            id="password"
            type="password"
            formik={formik}
          />
        </div>
      )}
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

export default FormStoreAdmin;
