import { Modal } from "flowbite-react";
import { useState } from "react";
import Koordinat from "./Koordinat";
import { ILocation } from "../types/location.type";
import Map from "./Map";
import { GoArrowLeft } from "react-icons/go";
import FormDetailAddress from "./FormDetailAddress";
const PickLocation = () => {
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [nowLocation, setNowLocation] = useState<ILocation>();

  const [step, setStep] = useState(1);

  return (
    <div className="flex justify-center">
      <button
        onClick={() => setOpenAddLocation(true)}
        className="border-2 p-2 rounded-lg w-full text-lg font-semibold"
      >
        Add Location
      </button>
      <Modal
        size={"4xl"}
        className="md:text-2xl "
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
          {step === 1 && (
            <Koordinat setStep={setStep} setNowLocation={setNowLocation} />
          )}
          {step === 2 && <Map nowLocation={nowLocation} setStep={setStep} />}
          {step === 3 && <FormDetailAddress nowLocation={nowLocation}  setOpenAddLocation={setOpenAddLocation} setStep={setStep}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PickLocation;
