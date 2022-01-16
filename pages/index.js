import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";

import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../components/blocks/TopCover";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const heroVideo = require("../public/videos/bergen_v2.mp4");
  return (
    <Layout page="home">
      <Head />
      <Heading text="Holidaze" size={1} />
      <TopCover video={heroVideo} img={heroImg.src} size="large"></TopCover>

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
