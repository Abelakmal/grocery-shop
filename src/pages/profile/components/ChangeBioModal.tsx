import { Button, Modal } from "flowbite-react";
import useUpdate from "../../../hooks/users/useUpdate";

const ChangeBioModal = ({
  openChangeBio,
  setOpenChangeBio,
  getUser,
  data,
}: any) => {
  const { formik } = useUpdate(data, setOpenChangeBio, getUser);

  return (
    <>
      <Modal
        show={openChangeBio}
        size="4xl"
        onClose={() => setOpenChangeBio(!openChangeBio)}
      >
        <Modal.Header className="text-2xl">Ubah Data</Modal.Header>
        <Modal.Body>
          <div>
          {formik.touched["email"] && formik.errors["email"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors["email"]}
                  </p>
                )}
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-2">
                <label>Name</label>
                <input
                  type="text"
                  className={`border-2   rounded-lg p-2`}
                  name="name"
                  value={formik.values["name"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              </div>
              <div className="flex flex-col  mb-2">
                <label>Email</label>
                <input
                  type="email"
                  className="border-2 rounded-lg p-2"
                  placeholder="example@email.com"
                  name="email"
                  value={formik.values["email"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label>No. Phone</label>
                <input
                  type="tel"
                  className="border-2 rounded-lg p-2"
                  placeholder="+62xxxxx"
                  name="phone"
                  value={formik.values["phone"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  pattern="[0-9]{12}"
                />

                {formik.touched["phone"] && formik.errors["phone"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors["phone"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  className="border-2 rounded-lg p-2"
                  name="dob"
                  value={formik.values["dob"].split("T")[0]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["dob"] && formik.errors["dob"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors["dob"]}
                  </p>
                )}
              </div>
              <div className="flex flex-col  mb-4">
                <label>Alamat</label>
                <input
                  type="text"
                  className="border-2 rounded-lg p-2"
                  name="address"
                  value={formik.values["address"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["address"] && formik.errors["address"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors["address"]}
                  </p>
                )}
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangeBioModal;
