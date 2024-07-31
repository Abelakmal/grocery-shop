import { Button } from "flowbite-react";
import { RiMapPinLine } from "react-icons/ri";
import useCreateLocation from "../hooks/location/useCreateLocation";
import InputAdress from "./InputAdress";

const FormDetailAddress = ({
  nowLocation,
  setOpenAddLocation,
  setStep,
}: any) => {
  const { formik } = useCreateLocation(
    nowLocation.latitude,
    nowLocation.longitude,
    setOpenAddLocation,
    setStep
  );

  return (
    <div>
      <div>
        <p>Pinpoint</p>
        <div className="flex mt-2 text-md items-center border-2 rounded-md p-2 shadow-md">
          <RiMapPinLine /> <p className="ml-3">{nowLocation.name}</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <InputAdress formik={formik} />
          <div className="flex items-center mt-4">
            <input
              name="main"
              type="checkbox"
              value={formik.values["main"]}
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
