// import { useState } from "react";
import {
  API_URL,
  ACCOMMODATION_ENDPOINT,
  MEDIA_ENDPOINT,
} from "../constants/api";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Link from "next/link";

import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import Card from "../components/blocks/Card";

export default function accommodations(props) {
  console.log(props);
  const pageSlug = "accommodation";
  return (
    <Layout page={pageSlug}>
      <Head title="Accommodation" />
      <TopCover img={heroImg} size="small">
        <Heading text="Accommodation" size={1} />
      </TopCover>

      <section className="accommodation__list">
        {props.items.map((item) => {
          return (
            <Card
              layoutWide={true}
              key={item.slug}
              slug={`/${pageSlug}/${item.slug}`}
              title={item.title}
              excerpt={item.excerpt}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const itemUrl = API_URL + ACCOMMODATION_ENDPOINT;
  const mediaUrl = API_URL + MEDIA_ENDPOINT;
  let data = [];
  let items = [];

  try {
    const response = await axios.get(itemUrl);
    data = response.data;
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      let imageUrl = "";

      // Get image if it exists
      if (data[i].featured_media) {
        imageUrl = await axios.get(mediaUrl + data[i].featured_media);
        imageUrl = imageUrl.data.source_url;
      }

      items.push({
        title: data[i].title.rendered,
        slug: data[i].slug,
        excerpt: data[i].excerpt.rendered,
        imageUrl: imageUrl,
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
