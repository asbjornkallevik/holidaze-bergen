import { API } from "../../constants/api";
import axios from "axios";

import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";

import heroImg from "../../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../../components/blocks/TopCover";

import AddHotel from "../../components/admin/AddHotel";

export default function addNew(props) {
  return (
    <Layout page="add-new">
      <Head title="Add new" />
      <TopCover img={heroImg.src} size="small">
        <Heading text="Add new hotel" size={1} />
      </TopCover>
      <AddHotel
        API={props.API}
        media={props.mediaLibrary}
        categories={props.categories}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const mediaUrl = API.API_URL + API.MEDIA_ENDPOINT;
  const categoriesUrl = API.API_URL + API.CATEGORIES_ENDPOINT;
  let mediaLibrary = [];
  let categories = [];
  try {
    const mediaResponse = await axios.get(mediaUrl + "?per_page=50");
    const categoriesResponse = await axios.get(categoriesUrl);

    mediaLibrary = mediaResponse.data;
    categories = categoriesResponse.data;
  } catch (error) {
    console.log(error);
  } finally {
    // finally
  }
  return {
    props: {
      API: API,
      mediaLibrary: mediaLibrary,
      categories: categories,
    },
  };
}
