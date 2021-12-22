import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Layout page="home">
      <Head />
      <Heading text="Holidaze" size={1} />
      <TopCover img={heroImg} size="large">
        <p>Testtt</p>
      </TopCover>
      {/* <div className="testBox"></div> */}
      {/* <div className="testBox2 alignshort"></div> */}
    </Layout>
  );
}
