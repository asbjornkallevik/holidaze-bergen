import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import ButtonLink from "../blocks/ButtonLink";

export default function DashboardMenu() {
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
    <section className="dashboard__menu">
      {hasAuth ? (
        <>
          <div className="dashboard__edit">
            <ButtonLink
              text="Edit a hotel"
              style="primary"
              link="/admin/edit-hotel"
            />
          </div>
          <div className="dashboard__add">
            <ButtonLink
              text="Add new hotel"
              style="success"
              link="/admin/add-new"
              left
            />
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
}
