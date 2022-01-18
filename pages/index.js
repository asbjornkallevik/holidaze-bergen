import { API } from "../constants/api";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import HolidazeSlogan from "../components/home/HolidazeSlogan";
import HotelLoop from "../components/blocks/HotelLoop";
import ButtonLink from "../components/blocks/ButtonLink";
import Link from "next/link";
import Image from "next/image";

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
      <Heading text="Popular hotels" />
      <section className="home__hotel-loop ">
        <HotelLoop hotels={props.items} />
      </section>

      <Heading text="Heading 2" size={2} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        scelerisque leo non elit suscipit fermentum. Pellentesque vulputate
        risus eu nibh aliquet dapibus id non sem. Donec blandit fermentum
        tortor, sed venenatis enim viverra non. Aenean sit amet ex magna.
        Suspendisse ut consectetur augue. Cras mattis dui nec dapibus laoreet.
        Ut porttitor massa vel ex ultrices vestibulum. Aliquam mi purus, auctor
        sed libero sit amet, tristique lobortis leo. Nunc nulla urna, varius in
        diam sit amet, vulputate semper purus. Cras eleifend lobortis elit quis
        fringilla.
      </p>
      <p>
        Maecenas vitae pretium odio. Nunc varius urna libero, sed condimentum
        ipsum dapibus vitae. Nullam sed est nec dui semper lacinia. Etiam a
        lorem ut turpis lobortis pretium id vel urna. Morbi tincidunt pharetra
        gravida. Ut quis tortor vel nisl suscipit facilisis. Nunc sodales turpis
        convallis mauris tristique bibendum. Nam eu consectetur leo. Fusce
        gravida sem sem, id convallis risus tempus eu. Cras vel odio sem. In hac
        habitasse platea dictumst. Nulla facilisi. Proin feugiat pharetra
        mauris, vitae pellentesque justo aliquam a. Nam quis pharetra erat. In
        convallis maximus efficitur.
      </p>
      <Heading text="Heading 3" size={3} />
      <Heading text="Heading 4" size={4} />

      {/* <div className="testBox"></div> */}
      {/* <div className="testBox2 alignshort"></div> */}
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

      console.log(data[i].acf.accommodation_facilities);
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
