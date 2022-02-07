import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Link from "next/link";

import EditSelectBox from "../forms/EditSelectBox";
import AddNewHotel from "../forms/AddNewHotel";

export default function EditHotel(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [hasAuth, setHasAuth] = useState(false);
  useEffect(() => {
    if (auth) {
      setHasAuth(true);
    } else {
      setHasAuth(false);
    }
  }, []);

  return (
    <section className="add-new__wrapper">
      {hasAuth ? (
        <EditSelectBox hotels={props.hotels}>
          <div id="hotelToEdit" data-id={0}></div>
          <div>
            <p className="edit-hotel__load-error error-message"></p>
          </div>
          <AddNewHotel
            API={props.API}
            media={props.media}
            categories={props.categories}
            hotels={props.hotels}
            editMode={true}
          />
        </EditSelectBox>
      ) : (
        <div>
          <p>
            You are not authorized to do this. <Link href="/">Go to home</Link>
          </p>
        </div>
      )}
    </section>
  );
}

EditHotel.propTypes = {
  hotels: PropTypes.array,
  media: PropTypes.array,
  categories: PropTypes.array,
  API: PropTypes.object,
  editMode: PropTypes.bool,
};
