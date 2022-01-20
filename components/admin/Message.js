import PropTypes from "prop-types";
import { utilities } from "../../scripts/utilities.js";
import { useEffect, useState } from "react";
import Button from "../blocks/Button.js";
import Link from "next/link";

import Modal from "../layout/Modal.js";
import Heading from "../typography/Heading";

async function handleDelete(message) {
  console.log("Deleting message ", message);
  location.reload();
  {
    /* DELETE QUERY HERE */
  }
}
export default function Message(props) {
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(function () {
    const buttonID = `expandMessage${props.content.id}`;
    const deleteMessage = document.querySelector(`#delete${props.content.id}`);
    const expandMessage = document.querySelector(`#${buttonID}`);
    const messageElement = document.querySelector(
      `#message${props.content.id}`
    );

    const modal = document.querySelector(".message-modal");
    const modalCloseBtn = document.querySelector("#modalClose");
    const alternativeCloseBtn = document.querySelector(".alternativeCloseBtn");

    expandMessage.addEventListener("click", (e) => {
      e.preventDefault();
      if (messageElement.classList.contains("message__message--open")) {
        messageElement.classList.remove("message__message--open");
        setMessageOpen(false);
      } else {
        messageElement.classList.add("message__message--open");
        setMessageOpen(true);
      }
    });

    // Delete message
    deleteMessage.addEventListener("click", (e) => {
      const finalDelete = modal.querySelector(".finalDelete");
      let messageID = e.currentTarget.dataset.id;
      modal.classList.add("open");
      finalDelete.addEventListener("click", () => {
        handleDelete(messageID);
      });
    });

    // Close modal
    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });
    if (alternativeCloseBtn) {
      alternativeCloseBtn.addEventListener("click", () => {
        modal.classList.remove("open");
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
      }
    });
  }, []);

  return (
    <div className="message">
      <div className="message__header">
        <div className="message__title">
          <Heading text={props.content.title} size={5} />
        </div>
        {/* DELETE BUTTON */}
        <div className="message__delete">
          <Link href="#">
            <div
              className="wrapper message__delete-btn"
              id={`delete${props.content.id}`}
              data-id={props.content.id}
            >
              <div className="text">Delete</div>
              <div className="icon">
                <svg
                  viewBox="-144 -144 288 288"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    transform="rotate(45)"
                    d="m-143,0a143,143 0 1,1 286,0 143,143 0 0,1 -286,0m128-112a113,113 0 0,0 -97,97h97zm-97,127a113,113 0 0,0 97,97v-97zm127,97a113,113 0 0,0 97-97h-97zm97-127a113,113 0 0,0 -97-97v97z"
                    fill="#f00"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="message__body">
        <div className="message__time">
          {utilities.getTimeStamp(props.content.created).dateStamp}
          <br />
          {utilities.getTimeStamp(props.content.created).timeStamp}
        </div>
        {props.children}
        <div
          className="message__expand"
          id={`expandMessage${props.content.id}`}
        >
          <Link href="#">{messageOpen ? "Hide message" : "Show message"}</Link>
        </div>

        <div className="message__message" id={`message${props.content.id}`}>
          <Heading text="Message" size={5} />
          {props.content.message
            ? props.content.message
            : "No message provided."}
        </div>
      </div>
      {/* Message delete modal */}
      <section className="modal message-modal" id={`#modal${props.content.id}`}>
        <div className="modal__dialog">
          <div className="modal__header">
            <Heading text="Delete test" size={3} customClass="modal__heading" />
            <Button
              text="X"
              style="secondary"
              customClass="modal__close"
              id="modalClose"
              short
            />
          </div>
          <div className="modal__body">
            <div className="message__delete-warning">
              <p>You are about to delete this message.</p>
              <p>Are you sure?</p>

              <div className="message__delete-buttons">
                <Button
                  text="No, go back"
                  style="success"
                  customClass="alternativeCloseBtn"
                />
                <Button
                  text="Yes, delete it"
                  style="secondary"
                  customClass="finalDelete"
                  // id={`delete${props.content.id}`}
                />
              </div>
            </div>
          </div>
          <div className="modal__footer"></div>
        </div>
      </section>
    </div>
  );
}

Message.propTypes = {
  content: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  auth: PropTypes.object.isRequired,
};
