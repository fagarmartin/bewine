import service from "./config.services";

const getProductsService = () => {
  return service.get("/products");
};

const detailProductService = (productId) => {
  return service.get(`/products/${productId}`);
};

export { getProductsService, detailProductService };
