import PropTypes from "prop-types";

import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Image from "next/image";

import Heading from "../typography/Heading";
import Button from "../blocks/Button";
import Link from "next/link";

// Validation schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter the name")
    .min(2, "Please enter at least 2 characters"),
  featuredImage: yup.string().required("Please select an image"),
  categories: yup.string().required("Please select a category"),
  description: yup
    .string()
    .required("Please write a description of the establishment")
    .min(20, "Please enter at least 20 characters"),
  excerpt: yup
    .string()
    .required("Please write an excerpt for the establishment")
    .min(20, "Please enter at least 20 characters")
    .max(300, "The excerpt is too long. Please keep it short."),
  streetaddress: yup
    .string()
    .required("Please enter the address")
    .min(3, "Please enter a valid street address"),
  postcode: yup
    .string()
    .required("Please enter your post code")
    .min(4, "Please enter a valid post code"),
  city: yup.string().required("Please enter city").min(2, "Please enter city"),
});

export default function AddNewHotel(props) {
  const mediaUrl = props.API.API_URL + props.API.MEDIA_ENDPOINT;
  const accommodationUrl = props.API.API_URL + props.API.ACCOMMODATION_ENDPOINT;

  const facilities = [
    { name: "Parking" },
    { name: "Free Wifi" },
    { name: "Pets allowed" },
    { name: "Coffee maker" },
    { name: "Bar" },
    { name: "Fitness room" },
    { name: "Swimming pool" },
    { name: "Breakfast included" },
    { name: "Accessible rooms" },
    { name: "Ocean view" },
    { name: "Restaurant" },
    { name: "Double bed" },
    { name: "King size bed" },
  ];

  const http = useAxios();

  const [previewImageID, setPreviewImageID] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("/image.jpg");
  const [roomAmount, setRoomAmount] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Display custom amount of hotel rooms form fields
  function rooms(roomAmount) {
    let roomFields = [];

    for (let i = 0; i < roomAmount; i++) {
      roomFields.push(
        <div key={i} className="form__group">
          <div className="form__field">
            <label htmlFor={`roomname${i + 1}`} name={`roomname${i + 1}`}>
              Room {i + 1} name
            </label>
            <input
              type="text"
              id={`roomname${i + 1}`}
              name={`roomname${i + 1}`}
              {...register(`rooms[${i}][accommodation_rooms_name]`)}
            />
            {errors.roomname && (
              <span className="form__warning">{errors.roomname.message}</span>
            )}
          </div>

          <div className="form__field">
            <label htmlFor={`roomprice${i + 1}`} name={`roomprice${i + 1}`}>
              Room {i + 1} price
            </label>
            <input
              type="text"
              id={`roomprice${i + 1}`}
              name={`roomprice${i + 1}`}
              {...register(`rooms[${i}][accommodation_rooms_price]`)}
            />
            {errors.roomprice && (
              <span className="form__warning">{errors.roomprice.message}</span>
            )}
          </div>
        </div>
      );
    }

    return roomFields;
  }

  useEffect(function () {
    const selectFeaturedImage = document.querySelector("#featuredImage");
    const selectCategory = document.querySelector("#categories");
    const checkFacilities = document.querySelector("#checkFacilities");
    const addRoom = document.querySelector("#addRoom");
    const removeRoom = document.querySelector("#removeRoom");

    // Populate image options in form
    selectFeaturedImage.innerHTML = `<option value=''>Select an image</option>
      `;
    for (let i = 0; i < props.media.length; i++) {
      const option = document.createElement("option");

      option.setAttribute("value", props.media[i].id);
      option.innerHTML = `${props.media[i].title.rendered}`;

      selectFeaturedImage.appendChild(option);
    }

    // Show preview image
    selectFeaturedImage.addEventListener("change", () => {
      const id = selectFeaturedImage.value;
      setPreviewImageID(id);

      if (id) {
        const image = props.media.filter((items) => {
          return items.id == id;
        });
        const imageUrl = image[0].source_url;
        setPreviewImageUrl(imageUrl);
      }
    });

    // Populate categories in form
    selectCategory.innerHTML = `<option value=''>Select a category</option>
      `;
    for (let i = 0; i < props.categories.length; i++) {
      const option = document.createElement("option");

      option.setAttribute("value", props.categories[i].id);
      option.innerHTML = `${props.categories[i].name}`;

      selectCategory.appendChild(option);
    }
    if (roomAmount === 1) {
      removeRoom.style.display = "none";
    }

    // Add or remove room fields
    addRoom.addEventListener("click", (e) => {
      e.preventDefault();
      setRoomAmount((roomAmount += 1));
      removeRoom.style.display = "block";
    });
    removeRoom.addEventListener("click", (e) => {
      e.preventDefault();
      setRoomAmount((roomAmount -= 1));
      if (roomAmount < 2) {
        removeRoom.style.display = "none";
      }
    });

    return () => {};
  }, []);

  async function onSubmit(data) {
    console.log(data);

    const rooms = data.rooms.slice(0, roomAmount);
    const categories = [parseInt(data.categories)];

    const accommodation = {
      status: "publish",
      title: data.title,
      categories: categories,
      featured_media: parseInt(data.featuredImage),
      content: data.description,
      excerpt: data.excerpt,
      acf: {
        accommodation_rooms: rooms,
        accommodation_facilities: data.facilities,
        accommodation_street_address: data.streetaddress,
        accommodation_post_code: data.postcode,
        accommodation_city: data.city,
        accommodation_image_gallery: [28, 38, 218, 219], // Dummy data
      },
    };

    try {
      const response = await http.post(accommodationUrl, accommodation);
      console.log(response);
    } catch (error) {
    } finally {
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Hotel name */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="title" name="title">
            Name of hotel/accommodation
          </label>
          <input type="text" id="title" name="title" {...register("title")} />
          {errors.title && (
            <span className="form__warning">{errors.title.message}</span>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="categories" name="categories">
            Select category
          </label>
          <select
            id="categories"
            name="categories"
            // defaultValue={"0"}
            {...register("categories")}
          ></select>
          {errors.categories && (
            <span className="form__warning">{errors.categories.message}</span>
          )}
        </div>
      </div>

      {/* Featured image */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="featuredImage" name="featuredImage">
            Choose featured image
          </label>
          <select
            id="featuredImage"
            name="featuredImage"
            // defaultValue={"0"}
            {...register("featuredImage")}
          ></select>
          {errors.featuredImage && (
            <span className="form__warning">
              {errors.featuredImage.message}
            </span>
          )}
        </div>
        {previewImageID ? (
          <div className="form__image">
            <Image
              layout="fill"
              objectFit="contain"
              src={previewImageUrl}
              alt="test"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Hotel excerpt */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="excerpt" name="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows="4"
            {...register("excerpt")}
          ></textarea>
          <p className="form__description">
            Write a short excerpt for the hotel
          </p>
          {errors.excerpt && (
            <span className="form__warning">{errors.excerpt.message}</span>
          )}
        </div>
      </div>

      {/* Hotel description */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="description" name="description">
            Content
          </label>
          <textarea
            id="description"
            name="description"
            rows="16"
            {...register("description")}
          ></textarea>
          <p className="form__description">
            Write some content for the hotel. Break it into paragraphs to
            improve readability.
          </p>
          {errors.description && (
            <span className="form__warning">{errors.description.message}</span>
          )}
        </div>
      </div>

      {/* Facilities */}

      <div className="form__group checkbox">
        <Heading text="Facilities" size={5} customClass="form__heading" />
        <fieldset id="checkFacilities">
          {facilities.map((facility) => {
            const facilityID = facility.name.replace(/\s/g, "").toLowerCase();
            return (
              <div key={facilityID} className="form__field">
                <label htmlFor={facilityID}>
                  <input
                    type="checkbox"
                    {...register("facilities")}
                    id={facilityID}
                    name="facilities"
                    value={facility.name}
                  />
                  {facility.name}
                </label>
              </div>
            );
          })}
        </fieldset>
        {/* {errors.facilities && (
          <span className="form__warning">{errors.facilities.message}</span>
        )} */}
      </div>

      {/* Hotel address */}
      <div className="form__group">
        <div className="form__field">
          <label htmlFor="streetaddress" name="streetaddress">
            Street address
          </label>
          <input
            type="text"
            id="streetaddress"
            name="streetaddress"
            {...register("streetaddress")}
          />
          {errors.streetaddress && (
            <span className="form__warning">
              {errors.streetaddress.message}
            </span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="postcode" name="postcode">
            Post code
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            {...register("postcode")}
          />
          {errors.postcode && (
            <span className="form__warning">{errors.postcode.message}</span>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="city" name="city">
            City
          </label>
          <input type="text" id="city" name="city" {...register("city")} />
          {errors.city && (
            <span className="form__warning">{errors.city.message}</span>
          )}
        </div>
      </div>

      {/* Rooms */}
      <Heading text="Rooms" size={5} customClass="form__heading" />
      {rooms(roomAmount)}
      <div className="form__modificators">
        <a href="#" id="removeRoom">
          Remove room
        </a>
        <a href="#" id="addRoom">
          Add room
        </a>
      </div>

      {/* Submit button */}
      <div className="form__submit" type="submit">
        <Button
          text="Save"
          style="success"
          id="formSubmit"
          type="submit"
          short
        />
      </div>

      <div className="form__success">New hotel is now created.</div>
      <div className="form__error">
        Something went wrong.
        <br /> Please try again later.
      </div>
    </form>
  );
}

AddNewHotel.propTypes = {
  API: PropTypes.object.isRequired,
  media: PropTypes.array,
  categories: PropTypes.array,
};
