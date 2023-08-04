import axios from "axios";
const key = process.env.REACT_APP_RAWG_KEY;
const axiosRawg = axios.create({
  baseURL: "https://api.rawg.io/api"
});
const getGamesList = async () => {
  console.log("/games?key="+process.env.REACT_APP_RAWG_KEY)
  return axiosRawg.get("/games?key="+key);

};


export { getGamesList };
