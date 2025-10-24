import axiosInstance from "./axiosInstance";

export const getLogin = async (data) => axiosInstance.post('/users/login', data);

