import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { TOKEN_PATH } from "../constants/api";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

function AcfTest(props) {
  const url = props.base_url + TOKEN_PATH;
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log(response.data);
      setAuth(response.data);
      router.push("/testAdmin ");
    } catch (error) {
      console.log("Error: ", error);
      setLoginError("Login error. Please check your username and password");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <span className="form-warning">{loginError}</span>}
        <label htmlFor="username" name="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="form-warning">{errors.username.message}</span>
        )}

        <label htmlFor="password" name="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="form-warning">{errors.password.message}</span>
        )}

        <button className="btn">Log in</button>
      </form>
    </div>
  );
}

export default AcfTest;
