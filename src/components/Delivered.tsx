import { IoLocationSharp } from "react-icons/io5";
import PickLocation from "./PickLocation";
import { useState } from "react";
import {  Modal } from "flowbite-react";

const Delivered = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="bg-[#fef9e9] ">
      <div className="flex flex-col text-sm sm:text-base md:flex-row text-left max-w-7xl mx-auto p-5 bg-[#fef9e9]">
        <div className=" text-[#848484] flex flex-row items-center">
          <span className=" text-lg">
            <IoLocationSharp />
          </span>
          <div
            className={`ml-2 lg:text-2xl cursor-pointer`}
            onClick={() => setOpenModal(true)}
          >
            Deliver to:
          </div>
        </div>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Delivere to?</Modal.Header>
          <Modal.Body>
            <PickLocation />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
``;
export default Delivered;
