import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import ChangeBioModal from "./ChangeBioModal";
import { format } from "date-fns";
import useChangeImg from "../../../hooks/users/useChangeImg";

const ProfilePage = ({ data, getUser }: any) => {
  const [openChangeBio, setOpenChangeBio] = useState(false);
  const { formik } = useChangeImg(getUser);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("preview", reader.result);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="md:flex md:p-8 p-2">
      <div className="border-4 rounded-lg w-max flex flex-col items-center relative  p-4 mb-6">
        <img
          src={formik.values.preview || data?.image || `/profile.webp`}
          alt=""
          className="md:h-96 md:w-96 w-48 "
        />
        <div className=" w-full flex flex-col items-center text-center m-3  text-xl  relative">
          <p className="border-2 w-full rounded-md h-full">Ubah Gambar</p>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="file"
              className="absolute left-0 top-0  cursor-pointer h-full w-full opacity-0"
              onChange={handleImageChange}
            />
            {formik.touched["image"] && formik.errors["image"] && (
              <p className="text-red-500 text-xs mt-1 w-full">
                {formik.errors["image"]}
              </p>
            )}
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className={`w-max mt-4 hidden  ${
                  formik.values.image && "block"
                }`}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="md:ml-32 font-medium">
        <ul className=" text-lg text-gray-400">
          <h1 className="text-3xl font-bold text-gray-500 mb-6">Biodata</h1>
          <li className="mb-4 flex">Name : {data?.name}</li>
          <li className="mb-4 flex">
            Tanggal Lahir :{" "}
            {format(data?.dob, "dd-MMM-yyyy") || (
              <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
            )}
          </li>
          <li className="mb-4 flex">
            Alamat :{" "}
            {data?.address || (
              <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
            )}
          </li>
        </ul>
        <ul className=" text-lg text-gray-400">
          <h1 className="text-3xl font-bold text-gray-500 mb-6">Kontak</h1>
          <li className="mb-4">Email : {data?.email}</li>
          <li className="mb-4 flex">
            Nomor Telp :{" "}
            {data?.phone || (
              <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
            )}
          </li>
        </ul>
        <div className="flex mt-10 mb-6">
          <Button className="mr-4">Ubah Password</Button>
          <Button onClick={() => setOpenChangeBio(!openChangeBio)}>
            Ubah Data
          </Button>
        </div>
      </div>
      <ChangeBioModal
        openChangeBio={openChangeBio}
        setOpenChangeBio={setOpenChangeBio}
        data={data}
        getUser={getUser}
      />
    </div>
  );
};

export default ProfilePage;
