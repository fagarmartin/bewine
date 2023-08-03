import axios from "axios";
const key = "?key=" + process.env.RAWG_KEY;
const axiosRawg = axios.create({
  baseURL: "https://api.rawg.io/api",
});
const getGamesList = async () => {
 return axiosRawg.get(`/games?key=2441e06f8cf94198b129a338b7ece6a5`);
};
export { getGamesList };
