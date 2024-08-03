import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../redux/features/userSlice";

const UserGuard = ({ component }: any) => {
  const { user, loading } = useSelector((state: any) => state.user);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

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
