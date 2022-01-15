import PropTypes from "prop-types";
import { useEffect } from "react";

import Heading from "../typography/Heading";
import Button from "../blocks/Button";

export default function Modal(props) {
  useEffect(function () {
    const modal = document.querySelector(".modal");
    const form = modal.querySelector(".form");
    const modalTrigger = document.querySelector(props.triggerID);
    const modalCloseBtn = document.querySelector("#modalClose");

    // Open modal
    modalTrigger.addEventListener("click", () => {
      modal.classList.add("open");
    });
    // Close modal
    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      if (form) {
        form.reset();
      }
    });
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        if (form) {
          form.reset();
        }
      }
    });

    // Add and remove class '.modal-open' when modal opens/closes
  }, []);

  return (
    <section className="single-page__request modal">
      <div className="modal__dialog">
        <div className="modal__header">
          <Heading text={props.title} size={3} customClass="modal__heading" />
          <Button
            text="X"
            style="secondary"
            customClass="modal__close"
            id="modalClose"
            short
          />
        </div>
        <div className="modal__body">{props.children}</div>
        <div className="modal__footer"></div>
      </div>
    </section>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  triggerID: PropTypes.string.isRequired,
  children: PropTypes.node,
};
