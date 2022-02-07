import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Button from "../blocks/Button";

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

export default function LoginForm(props) {
  useEffect(() => {}, []);
  const authUrl = props.API.API_BASE_URL + props.API.TOKEN_PATH;
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

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(authUrl, data);

      setAuth(response.data);
      if (router.pathname == "/admin/dashboard") {
        location.reload();
      } else {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoginError("Login error. Please check your username and password");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {loginError && <span className="form-warning">{loginError}</span>}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="username" name="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username")}
            />
            {errors.username && (
              <span className="form-warning">{errors.username.message}</span>
            )}
          </div>
        </div>

        <div className="form__group">
          <div className="form__field">
            <label htmlFor="password" name="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="form-warning">{errors.password.message}</span>
            )}
          </div>
        </div>

        <div className="form__submit" type="submit">
          <Button text="Log in" style="" id="formSubmit" type="submit" />
          {/* <input type="submit"></input> */}
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  API: PropTypes.object.isRequired,
};
