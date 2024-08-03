import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "../redux/features/userSlice";

const AuthGuard = ({ component }: any) => {
  const { user, loading } = useSelector((state: any) => state.user);

  console.log(loading);
  
  
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

  return user.id ? <Navigate to={"/"} replace /> : component;
};

export default AuthGuard;
