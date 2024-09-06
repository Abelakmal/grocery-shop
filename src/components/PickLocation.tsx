import { Modal } from "flowbite-react";
import { useState } from "react";
import Koordinat from "./Koordinat";
import Map from "./Map";
import { GoArrowLeft } from "react-icons/go";
import FormDetailAddress from "./FormDetailAddress";
import { useSelector } from "react-redux";
import { IUser } from "../types/user.type";
import { Link } from "react-router-dom";
import ViewAddress from "./ViewAddress";
import { RootState } from "../redux/store";
import useCreateLocation from "../hooks/location/useCreateLocation";
import useGetAddress from "../hooks/location/useGetAddress";
const PickLocation = () => {
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const user = useSelector((state: RootState) => state.user.user as IUser);
  const { address, refreshData } = useGetAddress();

  const [step, setStep] = useState(1);
  const { formik } = useCreateLocation(
    refreshData,
    setOpenAddLocation,
    setStep
  );

  return (
    <div className="flex justify-center flex-col">
      {user.id ? (
        <ViewAddress
          setOpenAddLocation={setOpenAddLocation}
          address={address}
          refreshData={refreshData}
        />
      ) : (
        <div className="border-2 rounded-md flex justify-between items-center p-4">
          <div>
            <h1 className="font-bold text-xl">Masuk</h1>
            <p>masuk terlebih dahulu Untuk Melihat Alamat</p>
          </div>
          <Link
            to={"/signin"}
            className="bg-green-500 text-white p-2 rounded-lg h-max"
          >
            Masuk
          </Link>
        </div>
      )}
      <Modal
        size={"6xl"}
        className="md:text-2xl"
        show={openAddLocation}
        onClose={() => setOpenAddLocation(false)}
      >
        <Modal.Header>
          <div className="flex items-center w-full ">
            {step !== 1 && (
              <p
                className="mr-12 cursor-pointer md:text-3xl "
                onClick={() => setStep(step >= 1 && step <= 3 ? step - 1 : 1)}
              >
                <GoArrowLeft />
              </p>
            )}
            <h1 className="md:text-4xl text-center  w-full">Tambah Alamat</h1>
          </div>
        </Modal.Header>
        <Modal.Body className="border-4 ">
          <div className="md:flex hidden w-full justify-center items-center mb-4 ">
            <div className="flex flex-col items-center ">
              <div
                className={`flex items-center border-2 px-4 py-2 rounded-full ${
                  step >= 1 && "bg-green-500 text-white"
                }`}
              >
                {1}
              </div>
              <p className="text-lg">Pilih lokasi</p>
            </div>
            <span className="w-1/4 border-2 h-max rounded-md mx-2"></span>
            <div className="flex flex-col items-center ">
              <div
                className={`flex items-center border-2 px-4 py-2 rounded-full ${
                  step >= 2 && "bg-green-500 text-white"
                }`}
              >
                {2}
              </div>
              <p className="text-lg">Lihat Map</p>
            </div>
            <span className="w-1/4 border-2 h-max rounded-md mx-2"></span>
            <div className="flex flex-col items-center ">
              <div
                className={`flex items-center border-2 px-4 py-2 rounded-full ${
                  step >= 3 && "bg-green-500 text-white"
                }`}
              >
                {3}
              </div>
              <p className="text-lg">Lengkapi Alamat</p>
            </div>
          </div>
          {step === 1 && <Koordinat formik={formik} setStep={setStep} />}
          {step === 2 && <Map formik={formik} setStep={setStep} />}
          {step === 3 && <FormDetailAddress formik={formik} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PickLocation;
