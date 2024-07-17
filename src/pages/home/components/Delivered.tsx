import { IoLocationSharp } from 'react-icons/io5';

const Delivered = () => {
  return (
    <div className="bg-[#fef9e9]">
      <div className="flex flex-col text-sm sm:text-base md:flex-row text-left max-w-7xl mx-auto p-5 bg-[#fef9e9]">
        <div className=" text-[#848484] flex flex-row items-center">
          <span className=" text-lg">
            <IoLocationSharp />
          </span>
          <div className={`ml-2 text-2xl`}>
            Deliver to:
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivered;
