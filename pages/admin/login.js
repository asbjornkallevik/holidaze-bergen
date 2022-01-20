import dynamic from "next/dynamic";
import { API } from "../../constants/api";

const Layout = dynamic(() => import("../../components/layout/Layout"), {
  ssr: false,
});
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";

import heroImg from "../../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../../components/blocks/TopCover";
import LoginForm from "../../components/forms/LoginForm";

export default function login(props) {
  return (
    <Layout page="login">
      <Head />

      <TopCover img={heroImg.src} size="small">
        <Heading text="Log in" size={1} />
      </TopCover>
      <LoginForm API={props.API} />
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
