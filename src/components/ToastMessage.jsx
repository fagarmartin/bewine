import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastMessage({
  messageTitle,
  message,
  setShow,
  show,
  bgColor,
  textColor,
}) {
  const [position, setPosition] = useState("top-end");

  return (
    <ToastContainer className="p-3" position={position} style={{ zIndex: 99 }}>
      <Toast onClose={() => setShow(false)} show={show} delay={1500} autohide>
        <Toast.Header style={{ backgroundColor: "#c8b589", color: textColor }}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{messageTitle}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
