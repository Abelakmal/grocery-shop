import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentAdmin } from "../redux/features/adminSlice";

const AdminGuard = ({ component }: any) => {
  const { admin, loading } = useSelector((state: any) => state.admin);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentAdmin());
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen w-full items-center bg-white">
        Loading...
      </div>
    );
  }
  return admin.id ? component : <Navigate to={"/admin/login"} />;
};

export default AdminGuard;
