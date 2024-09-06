import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/store";

interface Props {
  component: JSX.Element;
}

const UserGuard: React.FC<Props> = ({ component }) => {
  const { user, loading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen w-full items-center bg-white">
        Loading...
      </div>
    );
  }
  return user.id ? component : <Navigate to={"/signin"} />;
};

export default UserGuard;
