import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { RingLoader } from "react-spinners";
import { uploadImageService } from "../../services/upload.services";
import { useEffect, useState } from "react";
import {
  deleteAdminService,
  editAdminService,
} from "../../services/admin.services";
import { detailProductService } from "../../services/products.services";

function AdminEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    image: "",
    price: 1,
    tipo: "",
    bodega: "",
    stock: 1,
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await detailProductService(params.id);

      setFormInputs(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return; // si no hay seleccionado ningun archivo
    }

    setIsUploading(true);
    try {
      const uploadData = new FormData(); // formato en el que tiene q ser mandado al BE
      uploadData.append("image", e.target.files[0]); // image tiene que ser el mismo nombre q en el middleware uploader.single("image")

      const response = await uploadImageService(uploadData);

      setImageUrl(response.data.image); // manda la url de la imagen al front end, usando imageUrl
      setFormInputs({ ...formInputs, image: response.data.image });
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const handleInputsChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await editAdminService(params.id, formInputs);
      setIsLoading(false);
      navigate(`/admin`);
    } catch (error) {
      setIsLoading(false);

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  const handleDelete = async () => {
    try {
      await deleteAdminService(params.id);
      navigate("/admin");
    } catch (error) {
      navigate("/error");
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
      {/* si hay imagen en la BD */}
      {formInputs.image ? (
        <div>
          <img src={formInputs.image} alt="preview-img" width={200} />
        </div>
      ) : null}

      <Card className="admin-create-form">
        <h3>Editar Producto</h3>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bodega</Form.Label>
              <Form.Control
                type="text"
                name="bodega"
                value={formInputs.bodega}
                onChange={handleInputsChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formInputs.price}
                onChange={handleInputsChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="tipo"
                aria-label="Default select example"
                value={formInputs.tipo}
                onChange={handleInputsChange}
              >
                <option>Seleccione un tipo de vino:</option>
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
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="btn-forms">
              <Button
                variant="outline-success"
                type="submit"
                disabled={isLoading}
              >
                Editar Producto
              </Button>

              <Button
                variant="outline-danger"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Borrar Producto
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminEdit;
