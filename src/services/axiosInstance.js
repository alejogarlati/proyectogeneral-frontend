import axios from "axios";
import { API_URL } from "../../config.js";


const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("LInterceptor de Axios activado");
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("Access Token del LInterceptor:", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;

