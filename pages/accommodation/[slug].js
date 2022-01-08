import {
  API_URL,
  ACCOMMODATION_ENDPOINT,
  MEDIA_ENDPOINT,
} from "../../constants/api";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";

import TopCover from "../../components/blocks/TopCover";
import Heading from "../../components/typography/Heading";

export default function Slug(props) {
  console.log(props.item);
  return (
    <Layout>
      <Head title="Single page" />
      <TopCover img={props.item.imageUrl} size="medium">
        <Heading text={props.item.title} size={1} />
      </TopCover>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(API_URL + "accommodation");
    console.log(response.data);

    const accommodation = response.data;

    // Get paths
    const paths = accommodation.map((item) => ({
      params: { slug: item.slug },
    }));

    console.log(paths);

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const itemUrl = API_URL + ACCOMMODATION_ENDPOINT + `?slug=${params.slug}`;
  const mediaUrl = API_URL + MEDIA_ENDPOINT;
  let data = [];
  let item = {};
  let imageUrl = "";
  // console.log("params", params.id);
  try {
    const response = await axios.get(itemUrl);
    data = response.data;
    console.log(data);

    // Get image if it exists
    if (data[0].featured_media) {
      imageUrl = await axios.get(mediaUrl + data[0].featured_media);
      imageUrl = imageUrl.data.source_url;
    }

    item = {
      title: data[0].title.rendered,
      imageUrl: imageUrl,
    };
  } catch (error) {
  } finally {
  }
  return {
    props: {
      item: item,
    },
  };
}
