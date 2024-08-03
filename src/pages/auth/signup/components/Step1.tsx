import { CiShop } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { HiMiniArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Step1 = ({ setStep, formik, loading }: any) => {
  return (
    <div className="sm:p-10 p-4">
      <div className="max-sm:mb-4 flex justify-between bg-white">
        <Link to={"/"}>
          <div className="flex items-center w-max cursor-pointer  ">
            <IoMdArrowBack />
            <p className="ml-2">Back</p>
          </div>
        </Link>
        <h1 className="font-bold flex items-center text-xl">
          <span className="text-[#b1bf4c]">Grocery</span>{" "}
          <span className="text-[#848484] text">Shop</span>{" "}
          <span>
            <CiShop />
          </span>
        </h1>
      </div>
      <h1 className="font-semibold text-2xl sm:mt-10   ">
        Hallo, Welcome To Grocery SHop
      </h1>
      <p className="my-4 indent-8">
        Ayok Bergabung Saatnya belanja Kebutuhan kamu Dan nikmati dengan
        berbagai Promo yang Ada dan barang yang menarik.
      </p>
      <div className="mb-6">
        <div className="flex flex-col mb-4">
          <label className="mb-1">First Name</label>
          <input
            type="text"
            name="fristname"
            placeholder="example: Santoso"
            className={`border-2 rounded-lg p-2  ${
              formik.touched["fristname"] && formik.errors["fristname"]
                ? "border-red-500"
                : ""
            }`}
            value={formik.values["fristname"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched["fristname"] && formik.errors["fristname"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["fristname"]}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Last Name</label>
          <input
            type="text"
            placeholder="optional..."
            className={`border-2 rounded-lg p-2  ${
              formik.touched["lastname"] && formik.errors["lastname"]
                ? "border-red-500"
                : ""
            }`}
            name="lastname"
            value={formik.values["lastname"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      <button
        type="button"
        className="bg-[#162D3A] text-white rounded-lg p-1 flex justify-center items-center"
        onClick={() => setStep(2)}
        disabled={!formik.values.fristname}
      >
        {loading ? (
          "Loading...."
        ) : (
          <>
            Next <HiMiniArrowRight className="ml-2" />
          </>
        )}
      </button>
      <div className="my-8 text-center flex items-center">
        <div className="w-full border-2 h-max border-black rounded-lg"></div>
        <p className="mx-2">OR</p>
        <div className="border-2 w-full border-black rounded-lg"></div>
      </div>
      <ul>
        <li className="bg-[#F3F9FA] text-center mb-5 p-2 rounded-lg  flex items-center  justify-center cursor-pointer font-semibold shadow-md whitespace-nowrap">
          <img src="/Google.png" alt="google" className="mr-2" />
          Sign in with Google
        </li>
        <li className="bg-[#F3F9FA] text-center mb-10 p-2 rounded-lg  flex items-center justify-center cursor-pointer font-semibold shadow-md whitespace-nowrap">
          <img src="/Facebook.png" alt="facebook" className="mr-2" />
          Sign in with Facebook
        </li>
      </ul>
      <p className="flex justify-center w-full">
        Don't Have a acounnt?{" "}
        <Link to={"/signin"} className="text-blue-500 hover:underline ml-2">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Step1;
