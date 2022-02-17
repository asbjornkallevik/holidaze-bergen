import PropTypes from "prop-types";

import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import Button from "../blocks/Button";
import Spinner from "../blocks/Spinner";

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Please enter at least 3 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter a message")
    .min(10, "Please enter at least 10 characters"),
});

export default function HotelRequestForm({ API }) {
  const contactUrl = API.API_URL + API.CONTACT_ENDPOINT;
  const authUrl = API.API_BASE_URL + API.TOKEN_PATH;

  const [requestSuccess, setRequestSuccess] = useState(0);
  const [formReset, setFormReset] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [guestLogin, setGuestLogin] = useState(false);
  const http = useAxios();

  // Authorize guest user to send messages to API
  async function guestAuth(guest) {
    try {
      const response = await axios.post(authUrl, guest).then((response) => {
        setAuth(response.data);
      });
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }

  // DOM manipulation
  useEffect(
    function () {
      const form = document.querySelector(".form");
      const formSuccess = document.querySelector(".form__success");
      const formError = document.querySelector(".form__error");

      // Display success text for message sent
      if (requestSuccess === 1) {
        formSuccess.classList.add("show");
        formError.classList.remove("show");
        form.reset();
      } else if (requestSuccess === 2) {
        formSuccess.classList.remove("show");
        formError.classList.add("show");
      } else {
        formSuccess.classList.remove("show");
        formError.classList.remove("show");
      }

      if (formReset) {
        form.reset();
      }
      if (guestLogin) {
        // Submit form
        const submitButton = document.querySelector("#formSubmit");
        submitButton.click();
        setGuestLogin(false);
      }

      /*  form.addEventListener("reset", () => {
        setRequestSuccess(0);
      }); */
    },
    [requestSuccess, formReset, auth]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    setLoading(true);
    // Check authorization
    if (!auth) {
      guestAuth(API.GUEST_USER);
      setGuestLogin(true);
    }

    let contactMessage = {
      title: data.name,
      content: data.message,
      status: "publish",
      acf: {
        contact_email: data.email,
      },
    };

    try {
      const response = await http
        .post(contactUrl, contactMessage)
        .then((response) => {
          if (response.status === 201) {
            setRequestSuccess(1);
            setShowSubmit(false);
          } else {
            setRequestSuccess(2);
          }
        });
    } catch (error) {
    } finally {
      //   setFormReset(true);
      setAuth(null);
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="name" name="name">
              Your name
            </label>
            <input type="text" id="name" name="name" {...register("name")} />
            {errors.name && (
              <span className="form__warning">{errors.name.message}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              formNoValidate
              {...register("email")}
            />
            {errors.email && (
              <span className="form__warning">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              name="message"
              rows="8"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <span className="form__warning">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Submit button */}
        {showSubmit ? (
          <div className="form__submit">
            {loading ? <Spinner width={40} /> : ""}
            <Button
              text="Send"
              style="success"
              id="formSubmit"
              type="submit"
              short
            />

            {/* <input type="submit"></input> */}
          </div>
        ) : (
          ""
        )}

        <div className="form__success">
          Your request is now sent.
          <br /> We will get back to you within 24 hours.
        </div>
        <div className="form__error">
          Something went wrong when sending the message.
          <br /> Please try again later.
        </div>
      </form>
    </div>
  );
}

HotelRequestForm.propTypes = {
  API: PropTypes.object,
};
