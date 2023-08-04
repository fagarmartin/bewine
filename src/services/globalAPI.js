import axios from "axios";
const key = process.env.REACT_APP_RAWG_KEY;
const axiosRawg = axios.create({
  baseURL: "https://api.rawg.io/api",
});
axiosRawg.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`;
  }
  return config;
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
const getGameDetails =async (id)=>{
  return axiosRawg.get("/games/"+id+"?key=" + key+"&search=");
}
export { getGamesList, getGenresList,getGamesByGenderList,getGamesByGenderAndNameList,getGamesByName,getNavigationPage,getGameDetails };
