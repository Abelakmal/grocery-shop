import { Button } from "flowbite-react";
import { RiMapPinLine } from "react-icons/ri";
import useCreateLocation from "../hooks/location/useCreateLocation";

const FormDetailAddress = ({ nowLocation, setOpenAddLocation,setStep }: any) => {
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
          <div className="flex flex-col">
            <label>Label Alamat</label>
            <input
              name="label_alamat"
              type="text"
              className="rounded-md"
              value={formik.values["label_alamat"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["label_alamat"] &&
              formik.errors["label_alamat"] && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors["label_alamat"]}
                </p>
              )}
          </div>
          <div className="mt-4 ">
            <textarea
              placeholder="alamat lengkap "
              className="w-full rounded-md resize-none"
              name="detail_alamat"
              value={formik.values["detail_alamat"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched["detail_alamat"] &&
              formik.errors["detail_alamat"] && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors["detail_alamat"]}
                </p>
              )}
          </div>

          <div className="w-full border-4 my-8"></div>
          <div className="flex flex-col">
            <label>Nama Penerima</label>
            <input
              name="nama_penerima"
              type="text"
              className="rounded-md"
              value={formik.values["nama_penerima"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["nama_penerima"] &&
              formik.errors["nama_penerima"] && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors["nama_penerima"]}
                </p>
              )}
          </div>
          <div className="flex flex-col mt-4">
            <label>Nomor Penerima </label>
            <input
              name="nomor_penerima"
              type="text"
              className="rounded-md"
              value={formik.values["nomor_penerima"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["nomor_penerima"] &&
              formik.errors["nomor_penerima"] && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors["nomor_penerima"]}
                </p>
              )}
          </div>
          <div className="w-full flex justify-center mt-10">
            <Button type="submit" color={"success"}>Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDetailAddress;
