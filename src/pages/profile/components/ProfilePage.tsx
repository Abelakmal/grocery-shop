import { Button } from "flowbite-react";

const ProfilePage = ({data}:any) => {

  return (
    
        <div className="md:flex md:p-8 p-2">
          <div className="border-4 rounded-lg w-max flex flex-col items-center relative  p-4 mb-6">
            <img
              src={data?.image || `/profile.webp`}
              alt=""
              className="md:h-96 md:w-96 w-48 "
            />
            <div className="border-2 w-full text-center m-3 rounded-md text-xl cursor-pointer">
              <p>Ubah Gambar</p>
            </div>
          </div>
          <div className="md:ml-32 font-medium">
            <ul className=" text-lg text-gray-400">
              <h1 className="text-3xl font-bold text-gray-500 mb-6">Biodata</h1>
              <li className="mb-4 flex">Name : {data?.name}</li>
              <li className="mb-4 flex">
                Tanggal Lahir :{" "}
                {data?.dob || (
                  <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
                )}
              </li>
              <li className="mb-4 flex">
                Alamat :{" "}
                {data?.address || (
                  <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
                )}
              </li>
            </ul>
            <ul className=" text-lg text-gray-400">
              <h1 className="text-3xl font-bold text-gray-500 mb-6">Kontak</h1>
              <li className="mb-4">Email : {data?.email}</li>
              <li className="mb-4 flex">
                Nomor Telp :{" "}
                {data?.dob || (
                  <p className="text-black ml-2 text-nowrap"> Tidak ada</p>
                )}
              </li>
            </ul>
            <div className="flex mt-10 mb-6">
              <Button className="mr-4">Ubah Password</Button>
              <Button>Ubah Data</Button>
            </div>
          </div>
        </div>

  );
};

export default ProfilePage;
