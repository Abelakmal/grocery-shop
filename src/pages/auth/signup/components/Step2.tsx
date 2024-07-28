import { HiMiniArrowRight } from "react-icons/hi2";
import { IoMdArrowBack } from "react-icons/io";

const Step2 = ({ setStep,  formik, loading }: any) => {

console.log(formik.errors);

  return (
    <div className="sm:p-10 p-4 h-full max-sm:text-sm">
      <div className="flex justify-between">
        <div className="cursor-pointer" onClick={() => setStep(1)}>
          <div className="flex items-center w-max cursor-pointer  ">
            <IoMdArrowBack />
            <p className="ml-2">Back</p>
          </div>
        </div>
        <h1 className="text-center text-xl font-bold">
          Masukan Data Lengkap Dirimu
        </h1>
      </div>
      <div className="my-10 h-full" >
        <div className="flex flex-col opacity-50 mb-2">
          <label>Name</label>
          <input
            type="text"
            disabled
            className={`border-2  border-gray-300 rounded-lg p-2`}
            name="name"
            value={formik.values["fristname"] + " " + formik.values["lastname"]}
          />
        </div>
        <div className="flex flex-col  mb-2">
          <label>Email</label>
          <input
            type="email"
            className="border-2 rounded-lg p-2"
            placeholder="example@email.com"
            name="email"
            value={formik.values["email"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched["email"] && formik.errors["email"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["email"]}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>No. Phone</label>
          <input
            type="text"
            className="border-2 rounded-lg p-2"
            placeholder="+62xxxxx"
            name="phone"
            value={formik.values["phone"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched["phone"] && formik.errors["phone"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["phone"]}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Tanggal Lahir</label>
          <input
            type="date"
            className="border-2 rounded-lg p-2"
            name="dob"
            value={formik.values["dob"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched["dob"] && formik.errors["dob"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["dob"]}
            </p>
          )}
        </div>
        <div className="flex flex-col  mb-4">
          <label>Alamat</label>
          <input
            type="text"
            className="border-2 rounded-lg p-2"
            name="address"
            value={formik.values["address"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched["address"] && formik.errors["address"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["address"]}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Password</label>
          <input
            type="password"
            className="border-2 rounded-lg p-2"
            name="password"
            value={formik.values["password"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched["password"] && formik.errors["password"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["password"]}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label>Confirm Password</label>
          <input
            type="password"
            className="border-2 rounded-lg p-2"
            name="confirmPassword"
            value={formik.values["confirmPassword"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched["confirmPassword"] && formik.errors["confirmPassword"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["confirmPassword"]}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center w-[70%]">
            <p className="mr-2">Anda Menyetujui Kebijakan Aplikasi?</p>
            <input type="checkbox" className="" />{" "}
          </div>
          <button
            className="bg-[#162D3A] text-white rounded-lg py-1 px-4 flex justify-center items-center"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              "Loading...."
            ) : (
              <>
                Finish <HiMiniArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
