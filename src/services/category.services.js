import service from "./config.services";

const getCategories = () => {
    return service.get("/category");
  };
  export {getCategories}