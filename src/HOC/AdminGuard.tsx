import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentAdmin } from "../redux/features/adminSlice";
import { AppDispatch, RootState } from "../redux/store";

interface Props {
  component: JSX.Element;
}

const AdminGuard: React.FC<Props> = ({ component }) => {
  const { admin, loading } = useSelector((state: RootState) => state.admin);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentAdmin());
  }, [dispatch]);

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
