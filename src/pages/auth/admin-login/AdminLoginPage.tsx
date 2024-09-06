import { FormEvent, useState } from "react";
import useLoginAdmin from "../../../hooks/auth/useLoginAdmin";
import { Link } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";

const AdminLoginPage = () => {
  const { login, error, loading } = useLoginAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="bg-green-600  h-screen">
      <div className="max-sm:mb-4 flex justify-between fixed w-full p-2  bg-white/10">
        <Link to="/">
          <div className="flex items-center w-max cursor-pointer text-white">
            <IoMdArrowBack />
            <p className="ml-2">Back</p>
          </div>
        </Link>
        <h1 className="font-bold flex items-center text-xl">
          <span className="text-[#b1bf4c]">Grocery</span>{" "}
          <span className="text-[#b7b5b5] text">Shop</span>{" "}
          <span className=" text-white">
            <CiShop />
          </span>
        </h1>
      </div>
      <div className="flex justify-center h-screen items-center">
        <div className="bg-white  w-max h-max p-4">
          <h1 className="text-xl font-bold  mb-4">Selamat Datang</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className=" py-4 text-red-500">{error}</p>}
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-green-500 text-white p-2 rounded"
                disabled={loading}
              >
                {loading ? "Loading...." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
