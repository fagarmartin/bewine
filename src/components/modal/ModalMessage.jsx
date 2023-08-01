import { ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalMessage({ show, handleClose, acceptBtn, modalTitle, modalBody }) {
  const handleCloseBtn = async () => {
    acceptBtn();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "red" }}>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {modalBody}
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outline-danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outline-success" onClick={handleCloseBtn}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalMessage;
