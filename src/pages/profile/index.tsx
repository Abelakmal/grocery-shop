import { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import Transaction from "./components/Transaction";
import History from "./components/History";
import Coupun from "./components/Coupun";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const [page, setPage] = useState(1);
  const { user, loading, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  return (
    <div className="h-full">
      {loading || !user.id ? (
        <div className="flex justify-center h-screen w-full items-center bg-white">
          {loading ? (
            <div>Loading.....</div>
          ) : (
            <div className="text-4xl">
              {error} {":("}
            </div>
          )}
        </div>
      ) : (
        <div className=" bg-white lg:mx-20 lg:border-2 ">
          <ProfilePage user={user} />
          <div className="border-b-2 w-full  flex">
            <p
              className={`text-xl ml-4 ${
                page === 1 && "border-b-4 border-black"
              } w-max cursor-pointer`}
              onClick={() => setPage(1)}
            >
              Transaction
            </p>
            <p
              className={`text-xl ml-4 ${
                page === 2 && "border-b-4 border-black"
              } w-max cursor-pointer`}
              onClick={() => setPage(2)}
            >
              History
            </p>
            <p
              className={`text-xl ml-4 ${
                page === 3 && "border-b-4 border-black"
              } w-max cursor-pointer`}
              onClick={() => setPage(3)}
            >
              Coupon
            </p>
          </div>
          <div className="h-max">
            {page === 1 && <Transaction />}
            {page === 2 && <History />}
            {page === 3 && <Coupun />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
