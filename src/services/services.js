import axiosInstance from "./axiosInstance.js";

export const getLogin = async (data) => await axiosInstance.post('/users/login', data);
export const getUsers = async () => await axiosInstance.get('/users');
export const getUserById = async (id) => await axiosInstance.get(`/users/${id}`);
export const createUser = async (data) => await axiosInstance.post('/users', data);
