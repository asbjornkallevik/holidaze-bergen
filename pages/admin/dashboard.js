import dynamic from "next/dynamic";
import { utilities } from "../../scripts/utilities";
import { API } from "../../constants/api";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";

import heroImg from "../../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../../components/blocks/TopCover";
const DashboardMessages = dynamic(() =>
  import("../../components/admin/DashboardMessages")
);
import DashboardMenu from "../../components/admin/DashboardMenu";

export default function dashboard(props) {
  const requests = props.requests;
  const contactMessages = props.contactMessages;

  return (
    <Layout page="dashboard">
      <Head title="Dashboard" />

      <TopCover img={heroImg.src} size="small">
        <Heading text="Dashboard" size={1} />
      </TopCover>

      <section className="dashboard__wrapper">
        <DashboardMenu />
        <DashboardMessages
          contactMessages={contactMessages}
          requests={requests}
          API={props.API}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const requestsUrl = API.API_URL + API.REQUESTS_ENDPOINT;
  const contactUrl = API.API_URL + API.CONTACT_ENDPOINT;

  let requestData = [];
  let requests = [];
  let contactData = [];
  let contactMessages = [];

  try {
    const responseRequests = await axios.get(requestsUrl);
    requestData = responseRequests.data;
    const contactRequests = await axios.get(contactUrl);
    contactData = contactRequests.data;

    console.log(contactData);

    // Loop through requests
    for (let i = 0; i < requestData.length; i++) {
      const adults = requestData[i].acf.request_adults.match(/\d+/)[0];
      const children = requestData[i].acf.request_children.match(/\d+/)[0];
      const guests = {
        adults: adults,
        children: children,
      };

      requests.push({
        id: requestData[i].id,
        created: requestData[i].date,
        title: requestData[i].title.rendered,
        name: requestData[i].acf.request_name,
        email: requestData[i].acf.request_email,
        checkIn: requestData[i].acf.request_check_in,
        checkOut: requestData[i].acf.request_check_out,
        roomName: requestData[i].acf.request_room_name,
        guests: guests,
        message: requestData[i].acf.request_message,
        type: "hotelRequest",
      });
    }

    // Loop through contact messages
    for (let i = 0; i < contactData.length; i++) {
      const message = utilities.removeHTML(contactData[i].content.rendered);
      contactMessages.push({
        id: contactData[i].id,
        created: contactData[i].date,
        name: contactData[i].title.rendered,
        email: contactData[i].acf.contact_email,
        message: message,
        type: "contact",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    // finally
  }
  return {
    props: {
      requests: requests,
      contactMessages: contactMessages,
      API: API,
    },
  };
}
