import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const getLogin = async (data) =>
  await axiosInstance.post("/users/login", data);

export const getUsers = async () => await axiosInstance.get("/users");

export const getUserById = async (id) =>
  await axiosInstance.get(`/users/search/${id}`);

export const getUserByEmail = async (email) =>
  await axiosInstance.post("/users/search/email", email);

export const createUser = async (data) =>
  await axiosInstance.post("/users", data);

export const deleteUser = async (id) =>
  await axiosInstance.delete(`/users/destroy/${id}`);

export const getRoles = async () => await axiosInstance.get("/roles");

export const getProvincias = async () => await axiosInstance.get("/provincias");

export const getMenusByUserId = async (userId) =>
  await axiosInstance.get("/menus/user/" + userId);

export const getMenus = async () =>
  await axiosInstance.get("/menus");

export const getPermisosByUserId = async (user) => 
  await axiosInstance.get("/menus/permisos/user/" + user);

export const updatePermisosByUserId = async (datos) =>
  await axiosInstance.post ("/menus/permisos/user", datos);

export const getProvincias = async () =>
  await axiosInstance.get("/provincias");