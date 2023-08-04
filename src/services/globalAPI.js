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
const getGamesByGenderList = async (genre) => {
  return axiosRawg.get("/games?key=" + key+"&genres="+genre+"&page=2");
};
const getGamesByGenderAndNameList = async (genre,name) => {
  return axiosRawg.get("/games?key=" + key+"&genres="+genre+"&search="+name);
};
const getGamesByName = async (name) => {
  return axiosRawg.get("/games?key=" + key+"&search="+name);
};
const getNavigationPage= async (url)=>{
  return axiosRawg.get(url);
}
export { getGamesList, getGenresList,getGamesByGenderList,getGamesByGenderAndNameList,getGamesByName,getNavigationPage };
