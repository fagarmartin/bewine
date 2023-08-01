import { useState } from "react";
import { RingLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { createAdminService } from "../../services/admin.services";
import { uploadImageService } from "../../services/upload.services"; //cloudinary

function AdminCreate() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    image: "",
    price: 1,
    tipo: "",
    bodega: "",
    stock: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); //subir imagen
  const [isUploading, setIsUploading] = useState(false); //subir imagen

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return; // si no hay seleccionado ningun archivo
    }
    try {
      setIsUploading(true);
      const uploadData = new FormData(); // formato en el que tiene q ser mandado al BE
      uploadData.append("image", e.target.files[0]); // image tiene que ser el mismo nombre q en el middleware uploader.single("image")

      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.image); // manda la url de la imagen al front end, usando imageUrl
      setFormInputs({ ...formInputs, image: response.data.image });
      setIsUploading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/error");
    }
  };

  const handleInputsChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value }); // actualiza el estado de la propiedad que cambie en ese momento

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createAdminService(formInputs);
      setIsLoading(false);
      navigate("/admin");
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="preview-img" width={200} />
        </div>
      ) : null}
      <p>{formInputs.tipo}</p>

      <Card className="admin-create-form">
        <h3>Crear Producto</h3>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
                required
              />
              {isUploading ? (
                <div className="spinner">
                  {" "}
                  <RingLoader />{" "}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formInputs.name}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formInputs.description}
                onChange={handleInputsChange}
                rows={4}
                style={{ resize: "none" }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bodega</Form.Label>
              <Form.Control
                type="text"
                name="bodega"
                value={formInputs.bodega}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formInputs.price}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="tipo"
                aria-label="Default select example"
                value={formInputs.tipo}
                onChange={handleInputsChange}
                required
              >
                <option value="">Seleccione un tipo de vino:</option>
                <option value="Tinto">Tinto</option>
                <option value="Blanco">Blanco</option>
                <option value="Rosado">Rosado</option>
                <option value="Palo Cortado">Palo Cortado</option>
                <option value="Espumoso">Espumoso</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formInputs.stock}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="btn-forms">
              <Button
                variant="outline-success"
                type="submit"
                disabled={isLoading}
              >
                Crear Producto
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminCreate;
