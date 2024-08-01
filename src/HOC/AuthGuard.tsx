import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ component }: any) => {
  const { user, loading } = useSelector((state: any) => state.user);

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
