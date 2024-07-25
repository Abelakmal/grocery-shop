import { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Finish from "./components/Finish";
import useRegister from "../../../hooks/auth/useRegister";

interface TempData {
  fristname: string;
  lastname: string;
  dob: string;
  email: string;
  numberPhone: string;
  alamat: string;
  password: string;
}

export const Signup = () => {
  const [step, setStep] = useState<number>(1);
  const { formik, loading } = useRegister(setStep);
  return (
    <section className="">
      <div className="lg:flex justify-center items-center h-screen  w-full bg-white  rounded-lg relative">
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 ">
          {step === 1 && (
            <Step1 setStep={setStep} formik={formik} loading={loading} />
          )}
          {step === 2 && (
            <Step2 setStep={setStep} formik={formik} loading={loading} />
          )}
        </form>
        {step === 3 && <Finish />}
        <div className="w-[50%] hidden lg:block">
          <img src="/bg-login.jpg" alt="bg-login" />
        </div>
      </div>
    </section>
  );
};
