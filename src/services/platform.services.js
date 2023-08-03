import service from "./config.services";

const getPlatforms = () => {
    return service.get("/platform");
  };
  export {getPlatforms}