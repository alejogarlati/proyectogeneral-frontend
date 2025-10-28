import axiosInstance from "./axiosInstance.js";

export const getLogin = async (data) => await axiosInstance.post('/users/login', data);

