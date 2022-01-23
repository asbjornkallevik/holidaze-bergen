import PropTypes from "prop-types";
import { utilities } from "../../scripts/utilities";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../blocks/Button";

export default function EditSelectBox(props) {
  const { register, handleSubmit } = useForm();
  const [editHotel, setEditHotel] = useState(null);
  // Get form field selectors
  const form = {
    parent: document.querySelector("#hotelInputForm"),
    title: document.querySelector("#title"),
    category: document.querySelector("#categories"),
    featuredImage: document.querySelector("#featuredImage"),
    excerpt: document.querySelector("#excerpt"),
    content: document.querySelector("#description"),
    // facilities: document.querySelector('#xxxx'),
    streetaddress: document.querySelector("#streetaddress"),
    postcode: document.querySelector("#postcode"),
    city: document.querySelector("#city"),
    // rooms: "xxx",
  };

  // Get sorted array of hotels
  const hotels = utilities.sortItems(props.hotels, "title");

  useEffect(
    function () {
      const addRoom = document.querySelector("#addRoom");
      const selectHotel = document.querySelector("#hotel");
      const editButton = document.querySelector("#editButton");
      const hotelInputForm = document.querySelector("#hotelInputForm");
      const loadErrorMessage = document.querySelector(
        ".edit-hotel__load-error"
      );
      const hotelToEdit = document.querySelector("#hotelToEdit");

      // Display hotel edit form
      if (editHotel) {
        hotelInputForm.style.display = "flex";
        loadErrorMessage.style.display = "none";
        hotelToEdit.dataset.id = editHotel;

        try {
          let hotel = hotels.filter((item) => {
            return item.id === editHotel;
          });
          // Throw error if no data is loaded
          if (hotel.length < 1) {
            throw "This hotel data could not be loaded. Please try another hotel, or create a new hotel.";
          } else {
            hotel = hotel[0];
          }

          // Populate form with data
          form.parent.reset();
          form.title.value = hotel.title;
          form.category.value = hotel.categories[0];
          form.featuredImage.value = hotel.featured_media;
          form.excerpt.value = utilities.removeHTML(hotel.excerpt);
          form.content.value = utilities.removeHTML(hotel.content);
          form.streetaddress.value = hotel.acf.accommodation_street_address;
          form.postcode.value = hotel.acf.accommodation_post_code;
          form.city.value = hotel.acf.accommodation_city;
          // Populate facilities
          hotel.acf.accommodation_facilities.map((facility) => {
            const checkbox = document.querySelector(
              `#${utilities.getIdFormat(facility)}`
            );
            checkbox.checked = true;
          });

          // Add necessary room fields
          let addRoomFields = new Promise((resolve, reject) => {
            for (let i = 1; i < hotel.acf.accommodation_rooms.length; i++) {
              addRoom.click();
            }
            resolve();
          });
          // Populate rooms
          addRoomFields.then(() => {
            hotel.acf.accommodation_rooms.map((room) => {
              const index = hotel.acf.accommodation_rooms.indexOf(room) + 1;
              const roomName = document.querySelector(`#roomname${index}`);
              const roomPrice = document.querySelector(`#roomprice${index}`);

              roomName.value = room.accommodation_rooms_name;
              roomPrice.value = room.accommodation_rooms_price;
            });
          });

          const hotelIdHidden = document.createElement("input");
          hotelIdHidden.setAttribute("type", "hidden");
          hotelIdHidden.setAttribute("name", "hotelID");
          hotelIdHidden.id = "hotelID";
          form.parent.appendChild(hotelIdHidden);
          hotelIdHidden.value = "test";
        } catch (error) {
          console.log(error);
          // Show error message
          loadErrorMessage.innerHTML = error;
          loadErrorMessage.style.display = "block";
        } finally {
        }
      } else {
        hotelInputForm.style.display = "none";
      }

      // Populate hotels in select box
      selectHotel.innerHTML = `<option value=''>Select a hotel</option>`;
      editButton.style.display = "none";
      for (let i = 0; i < hotels.length; i++) {
        const option = document.createElement("option");

        option.setAttribute("value", hotels[i].id);
        option.innerHTML = `${hotels[i].title}`;

        selectHotel.appendChild(option);
      }

      // Hotel selector change event
      selectHotel.addEventListener("change", () => {
        console.log(selectHotel.options[selectHotel.selectedIndex]);
        if (selectHotel.value) {
          editButton.style.display = "flex";
          editButton.innerHTML = `Edit ${
            selectHotel.options[selectHotel.selectedIndex].text
          }`;
        } else {
          editButton.style.display = "none";
          setEditHotel(null);
        }
      });
    },
    [editHotel, hotels]
  );

  function onSubmit(data) {
    setEditHotel(parseInt(data.hotel));
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Hotel selector */}
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="hotel" name="hotel">
              Select hotel to edit
            </label>
            <select
              id="hotel"
              name="hotel"
              // defaultValue={"0"}
              {...register("hotel")}
            ></select>
          </div>
        </div>

        {/* Submit button */}
        <div className="form__submit" type="submit">
          <Button
            text="Edit this hotel"
            style="primary"
            id="editButton"
            type="submit"
            short
          />
        </div>
      </form>
      {props.children}
    </>
  );
}

EditSelectBox.propTypes = {
  hotels: PropTypes.array.isRequired,
  children: PropTypes.node,
};
