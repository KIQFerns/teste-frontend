// src/services/userService.js
import client from "../client";

export const getAllUsers = () => client.get("/users");
export const createUser = (data) => client.post("/users", data);
export const updateUser = (id, data) => client.put(`/users/${id}`, data);
export const deleteUser = (id) => client.delete(`/users/${id}`);
