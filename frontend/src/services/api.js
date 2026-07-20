import axios from "axios";

const api = axios.create({
  baseURL: "https://e-library-rest-api.onrender.com/api",

});

export default api;