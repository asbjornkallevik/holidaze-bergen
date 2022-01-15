import { utilities } from "../../scripts/utilities.js";
import { useEffect, useState } from "react";
import Button from "../blocks/Button.js";
import Link from "next/link";

import PropTypes from "prop-types";
import Heading from "../typography/Heading";

export default function Message(props) {
  const [messageOpen, setMessageOpen] = useState(false);
  useEffect(function () {
    const buttonID = `expandMessage${props.content.id}`;

    const expandMessage = document.querySelector(`#${buttonID}`);
    const messageElement = document.querySelector(
      `#message${props.content.id}`
    );

    expandMessage.addEventListener("click", () => {
      if (messageElement.classList.contains("message__message--open")) {
        messageElement.classList.remove("message__message--open");
        setMessageOpen(false);
      } else {
        messageElement.classList.add("message__message--open");
        setMessageOpen(true);
      }
    });
  }, []);

  return (
    <div className="message">
      <div className="message__header">
        <div className="message__title">
          <Heading text={props.content.title} size={5} />
        </div>
        <div className="message__time">
          {utilities.getTimeStamp(props.content.created).dateStamp}
          <br />
          {utilities.getTimeStamp(props.content.created).timeStamp}
        </div>
      </div>
      <div className="message__body">
        {props.children}
        <div
          className="message__expand"
          id={`expandMessage${props.content.id}`}
        >
          <Link href="#">{messageOpen ? "Hide message" : "Show message"}</Link>

          {/* <Button style="grey" text="View message" id="expandMessage" short /> */}
        </div>

        <div className="message__message" id={`message${props.content.id}`}>
          <Heading text="Message" size={5} />
          {props.content.message
            ? props.content.message
            : "No message provided."}
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  content: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
