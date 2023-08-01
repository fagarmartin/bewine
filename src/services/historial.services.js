import service from "./config.services";

const getHistorialService = () => {
  return service.get("/historial");
};

const addHistorialService = () => {
  return service.post("/historial/add");
};

export { getHistorialService, addHistorialService };
