// Importing necessary components and hooks
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/auth/useLogin";
import { FormEvent, useState } from "react";
import { CiShop } from "react-icons/ci";

const Signin = () => {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  // Handling form submission
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await login(email, password); 
  };

  return (
    <section className="h-screen flex bg-white items-center">
      <div className="lg:flex w-full  justify-center items-center rounded-lg relative">
        <div className="lg:w-[50%] sm:p-10 p-4 h-full">
          <div className="max-sm:mb-4 flex justify-between">
            <Link to="/">
              <div className="flex items-center w-max cursor-pointer">
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

          {/* Sign-in form section */}
          <h1 className="font-semibold text-2xl sm:mt-10">Hallo, Welcome Back</h1>
          <p className="my-4">Saatnya belanja lagi, Ayo nikmati dengan berbagai Promo yang Ada.</p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Email input field */}
            <div className="my-5 flex flex-col">
              <label className="mb-1">Email</label>
              <input
                type="email"
                placeholder="Example@email.com"
                className="border-2 rounded-lg p-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input field */}
            <div className="flex flex-col mb-5">
              <label className="mb-1">Password</label>
              <input
                type="password"
                placeholder="Input Your Password"
                className="border-2 rounded-lg p-2"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error message display */}
            {error && <p className=" py-4 text-red-500">{error}</p>}

            {/* Sign-in button */}
            <button className="bg-[#162D3A] text-white rounded-lg py-1" disabled={loading}>
              {loading ? "Loading...." : "Sign In"}
            </button>
          </form>

          {/* Other sign-in options */}
          <div className="my-8 text-center flex items-center">
            <div className="w-full border-2 h-max border-black rounded-lg"></div>
            <p className="mx-2">OR</p>
            <div className="border-2 w-full border-black rounded-lg"></div>
          </div>


          <ul>
            <li className="bg-[#F3F9FA] text-center mb-5 p-2 rounded-lg flex items-center justify-center cursor-pointer font-semibold shadow-md whitespace-nowrap">
              <img src="/Google.png" alt="google" className="mr-2" />
              Sign in with Google
            </li>
            <li className="bg-[#F3F9FA] text-center mb-10 p-2 rounded-lg flex items-center justify-center cursor-pointer font-semibold shadow-md whitespace-nowrap">
              <img src="/Facebook.png" alt="facebook" className="mr-2" />
              Sign in with Facebook
            </li>
          </ul>

          {/* Sign-up option */}
          <p className="flex justify-center w-full">
            Don't Have a acounnt? <Link to="/signup" className="text-blue-500 hover:underline ml-2">Sign up</Link>
          </p>
        </div>

        {/* Background image (visible only on large screens) */}
        <div className="w-[50%] hidden lg:block">
          <img src="/bg-login.jpg" alt="bg-login" />
        </div>
      </div>
    </section>
  );
};

export default Signin;
