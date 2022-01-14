import PropTypes from "prop-types";
import Heading from "../typography/Heading";
import Button from "../blocks/Button";

export default function Modal(props) {
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
  children: PropTypes.node,
};
