import { FormEvent, useState } from "react";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";

const ForgotPassword = () => {
  const { send } = useForgotPassword();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await send(email);
    navigate("/");
  };
  return (
    <div className="w-full md:bg-gray-100 md:flex justify-center items-center h-screen lg:px-10 ">
      <div className="p-4 flex items-center w-full justify-between border-b-2 absolute top-0 bg-white">
        <div className="flex items-center">
          <Link to={"/"}>
            <HiArrowSmallLeft className="mr-4 hover:bg-gray-400 cursor-pointer" />
          </Link>
          Kembali
        </div>
        <h1 className="text-xl font-semibold">Forgot Password</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="md:w-max bg-white rounded md:p-10 max-md:flex flex-col justify-center items-center max-md:h-screen"
      >
        <div className="flex flex-col mb-4">
          <label>Email</label>
          <input
            type="email"
            className="border-2 rounded-lg p-2"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          className="bg-green-600 text-white p-2 rounded"
          type="submit"
          disabled={!email}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
