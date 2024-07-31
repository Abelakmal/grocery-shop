const InputAdress = ({ formik }: any) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col">
        <label>Label Alamat</label>
        <input
          name="label"
          type="text"
          className="rounded-md font-medium text-gray-600"
          value={formik.values["label"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched["label"] && formik.errors["label"] && (
          <p className="text-red-500 text-xs mt-1">{formik.errors["label"]}</p>
        )}
      </div>
      <div className="mt-4 ">
        <textarea
          placeholder="alamat lengkap "
          className="w-full rounded-md resize-none font-medium text-gray-600"
          name="details"
          value={formik.values["details"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched["details"] && formik.errors["details"] && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors["details"]}
          </p>
        )}
      </div>
      <div className="w-full border-4 my-8"></div>
      <div className="flex flex-col">
        <label>Nama Penerima</label>
        <input
          name="recipient_name"
          type="text"
          className="rounded-md font-medium text-gray-600"
          value={formik.values["recipient_name"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched["recipient_name"] &&
          formik.errors["recipient_name"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["recipient_name"]}
            </p>
          )}
      </div>
      <div className="flex flex-col mt-4">
        <label>Nomor Penerima </label>
        <input
          name="recipient_number"
          type="text"
          className="rounded-md font-medium text-gray-600"
          value={formik.values["recipient_number"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched["recipient_number"] &&
          formik.errors["recipient_number"] && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors["recipient_number"]}
            </p>
          )}
      </div>
    </div>
  );
};

export default InputAdress;
