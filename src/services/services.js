import axiosInstance from "./axiosInstance.js";

export const getLogin = async (data) => {
    console.log("Previo al AxiosInstanve");
    await axiosInstance.post('/users/login', data);
}
