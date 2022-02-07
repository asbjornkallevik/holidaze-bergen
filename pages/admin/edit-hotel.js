import { API } from "../../constants/api";

import axios from "axios";

import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";

import heroImg from "../../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../../components/blocks/TopCover";

import EditHotel from "../../components/admin/EditHotel";

export default function editHotel(props) {
  return (
    <Layout page="edit-hotel">
      <Head title="Edit hotel" />
      <TopCover img={heroImg.src} size="small">
        <Heading text="Edit hotel" size={1} />
      </TopCover>
      <EditHotel
        API={props.API}
        media={props.mediaLibrary}
        categories={props.categories}
        hotels={props.hotels}
        editMode={true}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const mediaUrl = API.API_URL + API.MEDIA_ENDPOINT;
  const categoriesUrl = API.API_URL + API.CATEGORIES_ENDPOINT;
  const accommodationUrl = API.API_URL + API.ACCOMMODATION_ENDPOINT;

  let mediaLibrary = [];
  let categories = [];
  let hotelData = [];
  let hotels = [];

  try {
    const mediaResponse = await axios.get(mediaUrl + "?per_page=50");
    const categoriesResponse = await axios.get(categoriesUrl);

    const responseHotels = await axios.get(accommodationUrl);
    hotelData = responseHotels.data;

    mediaLibrary = mediaResponse.data;
    categories = categoriesResponse.data;

    // Loop through hotels
    for (let i = 0; i < hotelData.length; i++) {
      hotels.push({
        id: hotelData[i].id,
        title: hotelData[i].title.rendered,
        categories: hotelData[i].categories,
        slug: hotelData[i].slug,
        excerpt: hotelData[i].excerpt.rendered,
        content: hotelData[i].content.rendered,
        featured_media: hotelData[i].featured_media,
        acf: hotelData[i].acf,
      });
    }
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
      hotels: hotels,
    },
  };
}
