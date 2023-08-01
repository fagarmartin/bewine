import service from "./config.services";

const createAdminService = (newProduct) => {
  return service.post("/admin/create", newProduct);
};

const editAdminService = (productId, updatedProduct) => {
  return service.put(`/admin/${productId}`, updatedProduct);
};

const deleteAdminService = (productId) => {
  return service.delete(`/admin/${productId}`);
};

export { createAdminService, editAdminService, deleteAdminService };
