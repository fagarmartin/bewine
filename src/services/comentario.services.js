import service from "./config.services";

const addComentarioService = (productId, formInput) => {
  return service.post(`/comentario/${productId}/create`, formInput);
};

const allComentariosService = (productId, formInput) => {
  return service.get(`/comentario/${productId}`, formInput);
};

export { addComentarioService, allComentariosService };
