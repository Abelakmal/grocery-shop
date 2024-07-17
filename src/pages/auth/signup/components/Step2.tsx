import { ChangeEvent, FormEvent, useState } from "react";
import { HiMiniArrowRight } from "react-icons/hi2";

interface Input {
  email: string;
  phone: string;
  password: string;
  address: string;
  dob: string;
  confrimpassword: string;
}

const Step2 = ({ setStep, tempData, setTempData }: any) => {
  const [input, setInput] = useState<Input>({
    email: "",
    phone: "",
    address: "",
    dob: "",
    password: "",
    confrimpassword: "",
  });


  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStep(3);
    setTempData({ ...tempData, input });
  };


  return (
    <div className="lg:w-[50%] sm:p-10 p-4 h-full max-sm:text-sm">
      <h1 className="text-center text-xl font-bold">
        Masukan Data Lengkap Dirimu
      </h1>
      <form className="my-10 h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col  mb-2">
          <label>Email</label>
          <input
            type="email"
            className="border-2 rounded-lg p-2"
            placeholder="example@email.com"
            name="email"
            value={input.email}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>No. Phone</label>
          <input
            type="text"
            className="border-2 rounded-lg p-2"
            placeholder="+62xxxxx"
            name="phone"
            value={input.phone}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Tanggal Lahir</label>
          <input
            type="date"
            className="border-2 rounded-lg p-2"
            value={input.dob}
            name="dob"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col  mb-4">
          <label>Alamat</label>
          <input
            type="text"
            className="border-2 rounded-lg p-2"
            name="address"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Password</label>
          <input
            type="password"
            className="border-2 rounded-lg p-2"
            value={input.password}
            name="password"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label>Confirm Password</label>
          <input
            type="password"
            className="border-2 rounded-lg p-2"
            name="confrimpassword"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center w-[70%]">
            <p className="mr-2">Anda Menyetujui Kebijakan Aplikasi?</p>
            <input type="checkbox" className="" />{" "}
          </div>
          <button className="bg-[#162D3A] text-white rounded-lg py-1 px-4 flex justify-center items-center">
            Next <HiMiniArrowRight className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
