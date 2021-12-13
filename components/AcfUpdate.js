import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

const schema = yup.object().shape({
  testfield: yup.string().required("Please enter something"),
});

function AcfUpdate(props) {
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    const testFieldData = {
      acf: {
        accommodation_testfield: data.testfield,
      },
    };

    try {
      const hotelID = "7";
      const url = props.api_url + "accommodation/" + hotelID;
      const response = await http.put(url, testFieldData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="testfield" name="testfield">
          Username
        </label>
        <input
          type="text"
          id="testfield"
          name="testfield"
          {...register("testfield", { required: true })}
        />
        {errors.testfield && (
          <span className="form-warning">{errors.testfield.message}</span>
        )}

        <button className="btn">Update</button>
      </form>
    </div>
  );
}

export default AcfUpdate;
