import axios from "axios";

const API = axios.create({
  baseURL: "https://career-analyzer-wt3d.onrender.com",
});

export default API;
