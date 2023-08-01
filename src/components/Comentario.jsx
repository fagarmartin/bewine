import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComentarioService,
  allComentariosService,
} from "../services/comentario.services";
import { AuthContext } from "../context/auth.context";
import { RingLoader } from "react-spinners";

function Comentario() {
  const navigate = useNavigate();
  const params = useParams();
  const [formInput, setFormInput] = useState({
    comentario: "",
  });
  const { isLoggedIn } = useContext(AuthContext);
  const [allComentarios, setAllComentarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoggedIn) {
      // solo si esta logueado
      getData();
    } else {
      setIsLoading(false);
    }
  }, []);
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await allComentariosService(params.id, formInput);
      setAllComentarios(response.data);
      setIsLoading(false);
    } catch (error) {
     
      navigate("/error");
    }
  };
  const handleInputChange = (e) => {
    setFormInput({ comentario: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await addComentarioService(params.id, formInput);

      getData();

      setIsLoading(false);
      setFormInput({ comentario: "" });
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
      <div className="container-comentario">
        {isLoggedIn && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Deja tu comentario</Form.Label>
              <Form.Control
                as="textarea"
                name="comentario"
                value={formInput.comentario}
                onChange={handleInputChange}
                rows={4}
                cols={90}
                style={{ resize: "none" }}
              />
            </Form.Group>

            <Button
              variant="outline-success"
              type="submit"
              disabled={isLoading}
            >
              Enviar comentario
            </Button>
          </Form>
        )}
      </div>
      <div className="caja-comentarios">
        <h3>Comentarios</h3>
        {allComentarios.length === 0 && <h4>No hay ningún comentario</h4>}
        {allComentarios.map((eachComentario) => {
          return (
            <div key={eachComentario._id}>
              <p>Escrito por: {eachComentario.user.username} </p>

              <div className="comentarios">{eachComentario.comentario}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comentario;
