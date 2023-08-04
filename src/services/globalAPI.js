import axios from "axios";
const key = process.env.REACT_APP_RAWG_KEY;
const axiosRawg = axios.create({
  baseURL: "https://api.rawg.io/api",
});
const getGamesList = async () => {
  return axiosRawg.get("/games?key=" + key);
};
const getGenresList = async () => {
  return axiosRawg.get("/genres?key=" + key);
};

export { getGamesList, getGenresList };
