import PropTypes from "prop-types";
import { utilities } from "../../scripts/utilities";
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
import Spinner from "../blocks/Spinner";

export default function AddNewHotel(props) {
  const mediaUrl = props.API.API_URL + props.API.MEDIA_ENDPOINT;
  const accommodationUrl = props.API.API_URL + props.API.ACCOMMODATION_ENDPOINT;

  const [requestSuccess, setRequestSuccess] = useState(0);
  const [loading, setLoading] = useState(false);

  // Validation schema

  let schema = yup.object().shape({
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
    city: yup
      .string()
      .required("Please enter city")
      .min(2, "Please enter city"),
  });

  if (props.editMode) {
    schema = yup.object().shape({
      title: yup.string(),

      featuredImage: yup.string(),
      categories: yup.string(),
      description: yup.string(),

      excerpt: yup
        .string()

        .max(300, "The excerpt is too long. Please keep it short."),
      streetaddress: yup.string(),

      postcode: yup.string(),

      city: yup.string(),
    });
  }

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
  const [hotelToEdit, setHotelToEdit] = useState(false);

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

  useEffect(
    function () {
      const hotelInputForm = document.querySelector("#hotelInputForm");
      const selectFeaturedImage = document.querySelector("#featuredImage");
      const selectCategory = document.querySelector("#categories");
      const checkFacilities = document.querySelector("#checkFacilities");
      const addRoom = document.querySelector("#addRoom");
      const removeRoom = document.querySelector("#removeRoom");
      const getHotelId = document.querySelector("#hotelToEdit");

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

      if (props.editMode) {
        setHotelToEdit(getHotelId);
      }

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
    },
    [requestSuccess]
  );

  async function onSubmit(data) {
    setLoading(true);
    const rooms = data.rooms.slice(0, roomAmount);
    // console.log(data);

    const accommodation = {
      status: "publish",
      title: data.title,
      categories: data.categories,
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
    // console.log(accommodation);

    try {
      if (props.editMode) {
        // Edit existing hotel

        const hotelID = hotelToEdit.dataset.id;

        const hotelItem = props.hotels.filter((items) => {
          return items.id == hotelID;
        });

        const editAccommodation = hotelItem[0];

        const originalRooms = hotelItem[0].acf.accommodation_rooms;

        // console.log("item: ", hotelItem);
        // Add data to edit
        if (data.title) {
          editAccommodation.title = data.title;
          editAccommodation.slug = utilities.getSlugFormat(data.title);
        }
        if (data.categories) {
          editAccommodation.categories = data.categories;
        }
        if (data.featuredImage) {
          editAccommodation.featured_media = parseInt(data.featuredImage);
        }
        if (data.description) {
          editAccommodation.content = data.description;
        }
        if (data.excerpt) {
          editAccommodation.excerpt = data.excerpt;
        }
        if (data.streetaddress) {
          editAccommodation.acf.accommodation_street_address =
            data.streetaddress;
        }
        if (data.postcode) {
          editAccommodation.acf.accommodation_post_code = data.postcode;
        }
        if (data.city) {
          editAccommodation.acf.accommodation_city = data.city;
        }
        if (data.facilities) {
          editAccommodation.acf.accommodation_facilities = data.facilities;
        }
        editAccommodation.acf.accommodation_rooms = utilities.getRooms(
          rooms,
          originalRooms
        );

        const response = await http
          .put(accommodationUrl + hotelID, editAccommodation)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setRequestSuccess(1);
            } else {
              setRequestSuccess(2);
            }
          });
      } else {
        // Post new hotel
        const response = await http
          .post(accommodationUrl, accommodation)
          .then((response) => {
            if (response.status === 201) {
              setRequestSuccess(1);
            } else {
              setRequestSuccess(2);
            }
          });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        id="hotelInputForm"
      >
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
              <span className="form__warning">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        {/* Facilities */}

        <div className="form__group checkbox">
          <Heading text="Facilities" size={5} customClass="form__heading" />
          <fieldset id="checkFacilities">
            {facilities.map((facility) => {
              const facilityID = utilities.getIdFormat(facility.name);
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
          {loading ? (
            <Spinner width={40} />
          ) : (
            <Button
              text="Save"
              style="success"
              id="formSubmit"
              type="submit"
              short
            />
          )}
        </div>

        <div className="form__success">Hotel details has been saved.</div>
        <div className="form__error">
          Something went wrong.
          <br /> Please try again later.
        </div>
      </form>
    </>
  );
}

AddNewHotel.propTypes = {
  API: PropTypes.object.isRequired,
  media: PropTypes.array,
  categories: PropTypes.array,
  hotels: PropTypes.array,
  editMode: PropTypes.bool,
};

AddNewHotel.defaultProps = {
  editMode: false,
};
