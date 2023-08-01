import service from "./config.services";
const signupService = (user) => {
  return service.post("/auth/signup", user);
};

const loginService = (credentials) => {
  return service.post("/auth/login", credentials);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
