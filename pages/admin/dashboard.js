import dynamic from "next/dynamic";
import { utilities } from "../../scripts/utilities";
import { API } from "../../constants/api";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Layout = dynamic(() => import("../../components/layout/Layout"), {
  ssr: false,
});
// import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";
import Heading from "../../components/typography/Heading";

import heroImg from "../../public/images/cover/bergen_brygge_banner_1920.jpg";
import TopCover from "../../components/blocks/TopCover";
import Message from "../../components/admin/Message";
import ButtonLink from "../../components/blocks/ButtonLink";
import LoginForm from "../../components/forms/LoginForm";
import Link from "next/link";

export default function dashboard(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const requests = props.requests;
  const contactMessages = props.contactMessages;

  console.log("Dashboard: ", contactMessages);
  return (
    <Layout page="dashboard">
      <Head title="Dashboard" />

      <TopCover img={heroImg.src} size="small">
        <Heading text="Dashboard" size={1} />
      </TopCover>
      {auth ? (
        <section className="dashboard__wrapper">
          <section className="dashboard__menu">
            <div className="dashboard__edit">
              <ButtonLink
                text="Edit a hotel"
                style="primary"
                link="/admin/edit-hotel"
              />
            </div>
            <div className="dashboard__add">
              <ButtonLink
                text="Add new hotel"
                style="success"
                link="/admin/add-new"
                left
              />
            </div>
          </section>
          {/* <Heading text="Messages" size={2} /> */}
          <div className="dashboard__messages">
            <section className="dashboard__admin-messages">
              <Heading text="Contact messages" size={3} />
              {contactMessages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    content={message}
                    auth={auth}
                    API={props.API}
                  >
                    <Heading text={message.name} size={4} />
                    <p>
                      <Link href={`mailto:${message.email}`}>
                        {message.email}
                      </Link>
                    </p>
                  </Message>
                );
              })}
            </section>
            <section className="dashboard__hotel-requests">
              <Heading text="Hotel requests" size={3} />
              {requests.map((request) => {
                return (
                  <Message
                    key={request.id}
                    content={request}
                    auth={auth}
                    API={props.API}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <th>Regarding</th>
                          <th>Time period</th>
                        </tr>
                        <tr>
                          <td className="message__name">{request.name}</td>
                          <td className="message__room">{request.roomName}</td>
                          <td className="message__stay-dates">
                            {request.checkIn} -
                            <br />
                            {request.checkOut}
                          </td>
                        </tr>
                        <tr>
                          <th>Adults</th>
                          <th>Children</th>
                        </tr>
                        <tr>
                          <td className="message__adults">
                            {request.guests.adults}
                          </td>
                          <td className="message__children">
                            {request.guests.children}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Message>
                );
              })}
            </section>
          </div>
        </section>
      ) : (
        <section>
          <p>You are not authorized to view this page. Please log in.</p>
          <LoginForm API={props.API} />
        </section>
      )}
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
