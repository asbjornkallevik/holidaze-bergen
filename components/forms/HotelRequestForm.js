import PropTypes from "prop-types";

import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import Button from "../blocks/Button";

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
  checkIn: yup.string().required("Please select a check-in date"),
  checkOut: yup.string().required("Please select a check-out date"),
});

export default function HotelRequestForm({ hotel, API }) {
  const requestUrl = API.API_URL + API.REQUESTS_ENDPOINT;
  const authUrl = API.API_BASE_URL + API.TOKEN_PATH;

  const [requestSuccess, setRequestSuccess] = useState(0);
  const [auth, setAuth] = useContext(AuthContext);
  const http = useAxios();

  let rooms = "";

  // Authorize guest user to send messages to API
  async function guestAuth(guest) {
    try {
      const response = await axios.post(authUrl, guest).then((response) => {
        setAuth(response.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  // Check authorization
  if (!auth) {
    guestAuth(API.GUEST_USER);
  }

  // DOM manipulation
  useEffect(
    function () {
      const form = document.querySelector(".form");
      const formSuccess = document.querySelector(".form__success");
      const formError = document.querySelector(".form__error");
      const selectRooms = document.querySelector("#room");

      // Populate hotel room options in form
      selectRooms.innerHTML = "";
      for (let i = 0; i < hotel.rooms.length; i++) {
        const option = document.createElement("option");

        option.setAttribute("value", i);
        option.innerHTML = `${hotel.rooms[i].accommodation_rooms_name}, NOK ${hotel.rooms[i].accommodation_rooms_price},- per night`;

        selectRooms.appendChild(option);
      }

      // Display success text for message sent

      if (requestSuccess === 1) {
        formSuccess.classList.add("show");
        formError.classList.remove("show");
      } else if (requestSuccess === 2) {
        formSuccess.classList.remove("show");
        formError.classList.add("show");
      } else {
        formSuccess.classList.remove("show");
        formError.classList.remove("show");
      }

      form.addEventListener("reset", () => {
        setRequestSuccess(0);
      });
    },
    [requestSuccess, hotel.rooms]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    console.log(data);

    const roomName = data.room
      ? hotel.rooms[parseInt(data.room)].accommodation_rooms_name
      : hotel.rooms[0].accommodation_rooms_name;

    const hotelRequest = {
      title: hotel.title,
      content: data.content,
      status: "publish",
      acf: {
        request_hotel_id: hotel.id.toString(),
        request_name: data.name,
        request_email: data.email,
        request_check_in: data.checkIn,
        request_check_out: data.checkOut,
        request_room_name: roomName,
        request_adults: data.guestsAdults,
        request_children: data.guestsChildren,
        request_message: data.message,
      },
    };

    try {
      const response = await http
        .post(requestUrl, hotelRequest)
        .then((response) => {
          if (response.status === 201) {
            setRequestSuccess(1);
          } else {
            setRequestSuccess(2);
          }
        });

      // console.log(login.data);
    } catch (error) {
    } finally {
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* First name */}
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

        {/* Check-in and check-out*/}
        <div className="form__group">
          <div>
            <label htmlFor="checkIn" name="checkIn">
              Check-in date
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              {...register("checkIn")}
            />
            {errors.checkIn && (
              <span className="form__warning">{errors.checkIn.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="checkOut" name="checkOut">
              Check-out date
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              {...register("checkOut")}
            />
            {errors.checkOut && (
              <span className="form__warning">{errors.checkOut.message}</span>
            )}
          </div>
        </div>

        {/* Room */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="room" name="room">
              Desired room
            </label>
            <select
              id="room"
              name="room"
              defaultValue={"0"}
              {...register("room")}
            >
              {rooms}
            </select>
          </div>
        </div>

        {/* Guests */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="guestsAdults" name="guestsAdults">
              Adults
            </label>
            <select
              id="guestsAdults"
              name="guestsAdults"
              className="short"
              defaultValue={"a2"}
              {...register("guestsAdults")}
            >
              <option value="a1">1</option>
              <option value="a2">2</option>
              <option value="a3">3</option>
              <option value="a4">4</option>
            </select>
          </div>

          <div className="form__field">
            <label htmlFor="guestsChildren" name="guestsChildren">
              Children
            </label>
            <select
              id="guestsChildren"
              name="guestsChildren"
              className="short"
              defaultValue={"c0"}
              {...register("guestsChildren")}
            >
              <option value="c0">0</option>
              <option value="c1">1</option>
              <option value="c2">2</option>
              <option value="c3">3</option>
              <option value="c4">4</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="message">Optional message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <span className="form__warning">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="form__submit" type="submit">
          <Button
            text="Send"
            style="success"
            id="formSubmit"
            type="submit"
            short
          />
          {/* <input type="submit"></input> */}
        </div>

        <div className="form__success">
          Your request is now sent.
          <br /> {hotel.title} will get back to you within 24 hours.
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
  hotel: PropTypes.object,
  API: PropTypes.object,
};
