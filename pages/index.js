import { API } from "../constants/api";
import axios from "axios";

import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import HolidazeSlogan from "../components/home/HolidazeSlogan";
import HotelLoop from "../components/blocks/HotelLoop";
import HotelSearch from "../components/forms/HotelSearch";
import ButtonLink from "../components/blocks/ButtonLink";

export default function Home(props) {
  const heroVideo = require("../public/videos/bergen_v2.mp4");
  return (
    <Layout page="home">
      <Head />
      <Heading text="Holidaze" size={1} />
      <TopCover video={heroVideo} img={heroImg.src} size="large">
        <HolidazeSlogan />
        <div className="home__cta-button">
          <ButtonLink
            text="Find a hotel now"
            style="highlight"
            link="/accommodation"
            short
          />
        </div>
      </TopCover>
      {/* <Heading text="Search for a hotel" /> */}
      <HotelSearch allHotels={props.items} />
      <Heading text="Popular hotels" />
      <section className="home__hotel-loop ">
        <HotelLoop hotels={props.items} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const itemUrl = API.API_URL + API.ACCOMMODATION_ENDPOINT;
  const mediaUrl = API.API_URL + API.MEDIA_ENDPOINT;
  let data = [];
  let items = [];

  try {
    const response = await axios.get(itemUrl);
    data = response.data;

    for (let i = 0; i < data.length; i++) {
      let imageUrl = "";

      // Get image if it exists
      if (data[i].featured_media) {
        imageUrl = await axios.get(mediaUrl + data[i].featured_media);
        imageUrl = imageUrl.data.source_url;
      }

      items.push({
        id: data[i].id,
        title: data[i].title.rendered,
        slug: data[i].slug,
        excerpt: data[i].excerpt.rendered,
        imageUrl: imageUrl,
        facilities: data[i].acf.accommodation_facilities,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    // finally
  }
  return {
    props: {
      items: items,
    },
  };
}
