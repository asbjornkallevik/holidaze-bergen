import { API_URL } from "../../constants/api";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";

import TopCover from "../../components/blocks/TopCover";
import Heading from "../../components/typography/Heading";

export default function Slug(props) {
  return (
    <Layout>
      <Head title="Single page" />
      <Heading text="Single page" />
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

export async function getStaticProps() {
  return {
    props: {
      test: "test",
    },
  };
}
