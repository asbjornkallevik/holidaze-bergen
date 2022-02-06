import dynamic from "next/dynamic";

import Layout from "../components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import Head from "../components/layout/Head";
import Heading from "../components/typography/Heading";
import heroImg from "../public/images/cover/bergen_brygge_banner_1920.jpg";
import holidazeImg from "../public/images/holidaze.jpg";
import rainyBergen from "../public/images/rainy-bergen.jpg";

import TopCover from "../components/blocks/TopCover";
import ButtonLink from "../components/blocks/ButtonLink";
import ContactForm from "../components/forms/ContactForm";

export default function contact(props) {
  return (
    <Layout page="about-us">
      <Head title="About us" />
      <TopCover img={heroImg.src} size="medium">
        <Heading text="About us" size={1} />
      </TopCover>
      <section className="about-us__intro">
        <div className="about-us__intro-image">
          <Image
            src={holidazeImg.src}
            layout="fill"
            objectFit="cover"
            alt="Holidaze"
          />
        </div>
        <div className="about-us__intro-text">
          <Heading text="We are Holidaze" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            condimentum rutrum elit et tincidunt. Proin eleifend ut mi quis
            varius. Duis sed erat id elit tincidunt vehicula quis ut ex. Mauris
            at nisl nisi.
          </p>
        </div>
      </section>
      <section className="about-us__goals">
        <Heading text="Our goals" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          condimentum rutrum elit et tincidunt. Proin eleifend ut mi quis
          varius. Duis sed erat id elit tincidunt vehicula quis ut ex. Mauris at
          nisl nisi.
        </p>
      </section>
      <section className="about-us__partners">
        <Heading text="Our partners" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          condimentum rutrum elit et tincidunt. Proin eleifend ut mi quis
          varius. Duis sed erat id elit tincidunt vehicula quis ut ex. Mauris at
          nisl nisi.
        </p>
      </section>

      <section className="about-us__bergen">
        <div className="about-us__bergen-text">
          <Heading text="Connecting you with Bergen" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            condimentum rutrum elit et tincidunt. Proin eleifend ut mi quis
            varius. Duis sed erat id elit tincidunt vehicula quis ut ex. Mauris
            at nisl nisi.
          </p>
        </div>
        <div className="about-us__bergen-image">
          <Image
            src={rainyBergen.src}
            layout="fill"
            objectFit="cover"
            alt="Holidaze"
          />
        </div>
      </section>
      <section className="about-us__contact">
        <div className="about-us__contact-text">
          <Heading text="Do you run a hotel or guesthouse?" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            condimentum rutrum elit et tincidunt. Proin eleifend ut mi quis
            varius. Duis sed erat id elit tincidunt vehicula quis ut ex. Mauris
            at nisl nisi.
          </p>
        </div>
        <div className="about-us__contact-button">
          <ButtonLink text="Reach out to us" style="success" link="/contact" />
        </div>
      </section>
    </Layout>
  );
}
