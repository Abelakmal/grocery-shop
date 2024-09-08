import { Button } from "flowbite-react";
import { RiMapPinLine } from "react-icons/ri";
import InputAdress from "./InputAdress";
import React from "react";
import { FormikProps } from "formik";
import { IFormAddress } from "../types/address.type";

interface Props {
  formik: FormikProps<IFormAddress>;
}

const FormDetailAddress: React.FC<Props> = ({ formik }) => {
  return (
    <div>
      <div>
        <p>Pinpoint</p>
        <div className="flex mt-2 text-md items-center border-2 rounded-md p-2 shadow-md">
          <RiMapPinLine /> <p className="ml-3">{formik.values.location}</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <InputAdress formik={formik} />
          <div className="flex items-center mt-4">
            <input
              name="main"
              type="checkbox"
              value={formik.values.main ? 1 : 0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="ml-4 text-xl">Jadikan Alamat Utama</p>
          </div>
          <div className="w-full flex justify-center mt-10">
            <Button type="submit" color={"success"}>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDetailAddress;
