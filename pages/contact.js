import dynamic from "next/dynamic";
import { API } from "../constants/api";
const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});
import Link from "next/link";
import Image from "next/image";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";
import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import bergenBrygge from "../public/images/bergen-brygge.jpg";
import TopCover from "../components/blocks/TopCover";
import ContactForm from "../components/forms/ContactForm";

export default function contact(props) {
  return (
    <Layout page="contact">
      <Head title="Contact" />
      <TopCover img={heroImg.src} size="medium">
        <Heading text="Contact" size={1} />
      </TopCover>

      <section className="contact__address">
        <Heading text="Holidaze" />
        <address>
          <Heading text="Address" size={4} />
          Torgallmenningen 99
          <br />
          5020, Bergen
          <br />
          NORWAY
        </address>
        <Heading text="Contact details" size={4} />
        <p>
          Email: <Link href="mailto:post@holidaze.no">post@holidaze.no</Link>
        </p>
        <p>
          Phone: <Link href="tel:99999999">99 99 99 99</Link>
        </p>
      </section>
      <div className="contact__image">
        <Image
          src={bergenBrygge.src}
          layout="fill"
          objectFit="cover"
          alt="Bergen Brygge"
        />
      </div>
      <section className="contact__form">
        <Heading text="Get in touch" />
        <ContactForm API={props.API} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      API: API,
    },
  };
}
