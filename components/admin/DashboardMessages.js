import PropTypes from "prop-types";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

import Heading from "../typography/Heading";
import Message from "./Message";
import LoginForm from "../forms/LoginForm";

import Link from "next/link";

export default function DashboardMessages(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [hasAuth, setHasAuth] = useState(false);
  useEffect(() => {
    if (auth) {
      setHasAuth(true);
    } else {
      setHasAuth(false);
    }
  }, []);
  return (
    <div className="dashboard__messages">
      {hasAuth ? (
        <>
          <section className="dashboard__admin-messages">
            <Heading text="Contact messages" size={3} />
            {props.contactMessages.map((message) => {
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
            {props.requests.map((request) => {
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
        </>
      ) : (
        <section className="dashboard__login">
          <p>You are not authorized to view this page. Please log in.</p>
          <LoginForm API={props.API} />
        </section>
      )}
    </div>
  );
}

DashboardMessages.propTypes = {
  contactMessages: PropTypes.array,
  requests: PropTypes.array,
  API: PropTypes.object,
};
