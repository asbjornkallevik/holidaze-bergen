/* eslint-disable react-hooks/rules-of-hooks */
import AcfUpdate from "../components/AcfUpdate";
import { API_BASE_URL, API_URL } from "../constants/api";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

function testAdmin(props) {
  //   const [auth, setAuth] = useContext(AuthContext);
  return (
    <div>
      <AcfUpdate api_url={props.api_url} />
    </div>
  );
}

export default testAdmin;

export async function getStaticProps() {
  const api_url = API_URL;

  return {
    props: {
      api_url: api_url,
    },
  };
}
