import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { createAdminService } from "../../services/admin.services";
import { uploadImageService } from "../../services/upload.services"; //cloudinary
import { getCategories } from "../../services/category.services";
import { getPlatforms } from "../../services/platform.services";

function AdminCreate() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    image: "",
    price: 1,
    category: [],
    company: "",
    stock: 1,
    year: "",
    platform: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); //subir imagen
  const [isUploading, setIsUploading] = useState(false); //subir imagen
  const [isLoadingMulti, setIsLoadingMulti] = useState(true);
  const [multiSelect, setMultiSelect] = useState([]);
  const [multiSelectPlatform, setMultiSelectPlatform] = useState([]);
  
  const getMultiData = async () => {
    try {
      const response = await getCategories();
      setMultiSelect(response.data);
      const responsePlatforms = await getPlatforms();
      setMultiSelectPlatform(responsePlatforms.data);
      setIsLoadingMulti(false);
    } catch (err) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getMultiData();
  }, []);

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return; // if no file selected
    }
    try {
      setIsUploading(true);
      const uploadData = new FormData(); // format to be sent to BD
      uploadData.append("image", e.target.files[0]); // same image name as in  middleware uploader.single("image")

      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.image); // sends the url of the image to the front end, using imageUrl
      setFormInputs({ ...formInputs, image: response.data.image });
      setIsUploading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/error");
    }
  };

  const handleInputsChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value }); // updates state of the property that changes in that moment

  const handleMultiSelect = (e) =>
    setFormInputs({
      ...formInputs,
      [e.target.name]: Array.from(
        e.target.selectedOptions,
        (option) => option.id
      ),
    });

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

  if (isLoading || isLoadingMulti) {
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
      <p>{formInputs.category}</p>

      <Card className="admin-create-form">
        <h3>Create product</h3>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formInputs.name}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={formInputs.year}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
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
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formInputs.company}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formInputs.price}
                onChange={handleInputsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Choose categories:</Form.Label>
              <Form.Select
                name="category"
                aria-label="Default select example"
                value={formInputs.category}
                onChange={handleMultiSelect}
                required
                multiple
              >
                {multiSelect.map((eachElement) => {
                  return (
                    <option
                      key={eachElement._id}
                      name={eachElement.name}
                      id={eachElement._id}
                      value={eachElement._id}
                    >
                      {eachElement.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Choose platforms:</Form.Label>
              <Form.Select
                name="platform"
                aria-label="Default select example"
                value={formInputs.platform}
                onChange={handleMultiSelect}
                required
                multiple
              >
                {multiSelectPlatform.map((eachElement) => {
                  return (
                    <option
                      key={eachElement._id}
                      name={eachElement.name}
                      id={eachElement._id}
                      value={eachElement._id}
                    >
                      {eachElement.name}
                    </option>
                  );
                })}
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
                Create Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminCreate;
