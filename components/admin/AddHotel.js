import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Link from "next/link";

import AddNewHotel from "../forms/AddNewHotel";

export default function AddHotel(props) {
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
        <AddNewHotel
          API={props.API}
          media={props.media}
          categories={props.categories}
        />
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

AddHotel.propTypes = {
  media: PropTypes.array,
  categories: PropTypes.array,
  API: PropTypes.object,
};
