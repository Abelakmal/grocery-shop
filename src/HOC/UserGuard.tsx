import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserGuard = ({ component }: any) => {
  const { user, loading } = useSelector((state: any) => state.user);

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
