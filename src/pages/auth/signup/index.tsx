import { useState } from "react";
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"
import Finish from "./components/Finish";

interface TempData{
    fristname: string
    lastname: string,
    dob:string,
    email: string,
    numberPhone: string,
    alamat: string,
    password:string
}

export const Signup = () => {
    const [step,setStep] = useState<number>(1);
    const [tempData, setTempData] = useState<TempData>({
        fristname: '',
        lastname: '',
        dob: '',
        alamat: '',
        email: '',
        numberPhone: '',
        password:''
    });

    console.log(tempData);
    
  return (
    <section className="h-screen flex item-center">
      <div className="lg:flex  w-full bg-white justify-center items-center rounded-lg relative">
        {step === 1 &&  <Step1 setStep={setStep} tempData={tempData} setTempData={setTempData}/>}
        {step === 2 && <Step2 setStep={setStep} tempData={tempData} setTempData={setTempData}/>}
        {step === 3 && <Finish />}
        <div className="w-[50%] hidden lg:block">
          <img src="/bg-login.jpg" alt="bg-login" />
        </div>
      </div>
    </section>
  );
};
