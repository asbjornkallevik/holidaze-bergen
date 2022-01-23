import dynamic from "next/dynamic";
import { API } from "../constants/api";
import axios from "axios";
const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});
import Head from "../components/layout/Head";

import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import Card from "../components/blocks/Card";
import HotelSearch from "../components/forms/HotelSearch";

export default function accommodations(props) {
  const pageSlug = "accommodation";
  return (
    <Layout page={pageSlug}>
      <Head title="Accommodation" />
      <TopCover img={heroImg.src} size="small">
        <Heading text="Accommodation" size={1} />
      </TopCover>

      {/* Hotel search */}
      <section className="accommodation__search">
        <HotelSearch allHotels={props.items} />
      </section>
      {/* Hotels list */}
      <section className="accommodation__list">
        {props.items.map((item) => {
          return (
            <Card
              layoutWide={true}
              key={item.slug}
              id={item.id}
              slug={`/${pageSlug}/${item.slug}`}
              title={item.title}
              excerpt={item.excerpt}
              imageUrl={item.imageUrl}
              facilities={item.facilities}
            />
          );
        })}
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
