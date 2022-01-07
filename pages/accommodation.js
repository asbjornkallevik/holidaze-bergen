// import { useState } from "react";
import { API_URL } from "../constants/api";
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
  return (
    <Layout page="accommodation">
      <Head title="Accommodation" />
      <TopCover img={heroImg} size="small">
        <Heading text="Accommodation" size={1} />
      </TopCover>

      <section className="accommodation__list">
        {props.items.map((item) => {
          return (
            <Card
              layoutWide={true}
              key={item.title}
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
  const url = API_URL + "accommodation";
  let data = [];
  let items = [];

  try {
    const response = await axios.get(url);
    data = response.data;

    for (let i = 0; i < data.length; i++) {
      let imageUrl = "";

      // Get image if it exists
      if (data[i].featured_media) {
        imageUrl = await axios.get(API_URL + "media/" + data[i].featured_media);
        imageUrl = imageUrl.data.source_url;
        console.log(imageUrl);
      }

      items.push({
        title: data[i].title.rendered,
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
