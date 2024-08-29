import { FormEvent, useState } from "react";
import useLoginAdmin from "../../../hooks/auth/useLoginAdmin";

const AdminLoginPage = () => {
  const { login, error, loading } = useLoginAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="bg-green-600 flex justify-center items-center h-screen">
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
            <button className="bg-green-500 text-white p-2 rounded" disabled={loading}>{loading ? "Loading...." : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
