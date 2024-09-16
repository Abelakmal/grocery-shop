import { IoLocationSharp } from "react-icons/io5";
import PickLocation from "./PickLocation";
import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../redux/features/addressSlice";
import { AppDispatch, RootState } from "../redux/store";

const Delivered = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector((state: RootState) => state.address.address);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getAddress());
    }
  }, [token, dispatch, address.main]);

  return (
    <div className="bg-[#fef9e9] ">
      <div className="flex flex-col text-sm sm:text-base md:flex-row text-left max-w-7xl mx-auto md:p-5 p-2 bg-[#fef9e9] ">
        <div className=" text-[#848484] flex flex-row items-center  ">
          <span className=" text-lg">
            <IoLocationSharp />
          </span>
          <div
            className={`ml-2   cursor-pointer flex items-center`}
            onClick={() => setOpenModal(true)}
          >
            <p className="text-[10px] lg:text-lg">Deliver to:</p>
            {address.id && token ? (
              <div>
                <p className="ml-2 font-bold lg:text-lg text-[10px] text-black flex items-center">
                  {address.label} {address.recipient_name}{" "}
                  <MdKeyboardArrowDown className="text-3xl" />
                </p>
              </div>
            ) : (
              <p className="ml-2 font-bold text-[10px] lg:text-lg text-black flex items-center">
                Jakarta Pusat
                <MdKeyboardArrowDown className="text-3xl" />
              </p>
            )}
          </div>
        </div>

        <Modal
          size={"6xl"}
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>
            <div className="md:text-4xl ">Delivere to?</div>
          </Modal.Header>
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
