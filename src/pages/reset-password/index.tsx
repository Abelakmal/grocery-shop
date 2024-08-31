import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useUpdatePassword from "../../hooks/users/useUpdatePassword";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  let [query] = useSearchParams();
  const navigate = useNavigate();
  const { formik } = useUpdatePassword(query.get("resetToken") as string);

  useEffect(() => {
    if (!query.get("resetToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full bg-gray-100 flex justify-center items-center  h-screen">
      <div className="p-4 flex items-center w-full justify-between border-b-2 absolute top-0 bg-white">
        <div className="flex items-center">
          <Link to={"/signin"}>
            <HiArrowSmallLeft className="mr-4 hover:bg-gray-400 cursor-pointer" />
          </Link>
          Kembali
        </div>
        <h1 className="text-xl font-semibold">Reset Password</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-max bg-white rounded p-10 mx-10"
      >
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
          {formik.touched["confirmPassword"] &&
            formik.errors["confirmPassword"] && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors["confirmPassword"]}
              </p>
            )}
        </div>
        <button className="bg-green-600 text-white p-2 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
