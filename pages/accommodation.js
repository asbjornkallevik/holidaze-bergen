import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Link from "next/link";

import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import Card from "../components/blocks/Card";

function accommodations() {
  return (
    <Layout page="accommodation">
      <Head title="Accommodation" />
      <TopCover img={heroImg} size="small">
        <Heading text="Accommodation" size={1} />
      </TopCover>

      <section className="accommodation__list">
        <Card test="haha" />
        <Card test="haha" />
        <Card test="haha" />
        <Card test="haha" />
      </section>
    </Layout>
  );
}

export default accommodations;
