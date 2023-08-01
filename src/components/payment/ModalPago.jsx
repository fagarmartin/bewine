import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PaymentIntent from "./PaymentIntent";

function ModalPago(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pasarela de pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PaymentIntent price={props.price} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPago;
