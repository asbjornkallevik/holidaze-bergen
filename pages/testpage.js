import axios from "axios";
import AcfTest from "../components/AcfTest";
import { API_BASE_URL, API_URL } from "../constants/api";

function testpage(props) {
  return (
    <>
      <div>
        This is a testpage that will test communication with ACF in wordpress.
      </div>
      <a href="/">Home</a>
      <AcfTest base_url={props.base_url} api_url={props.api_url} />
    </>
  );
}

export default testpage;

export async function getStaticProps() {
  const base_url = API_BASE_URL;
  const api_url = API_URL;

  return {
    props: {
      base_url: base_url,
      api_url: api_url,
    },
  };
}
