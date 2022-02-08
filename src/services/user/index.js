import { Api } from "../../helpers/api";

export const getUsers = async () => {
  const res = await Api.get("/");
  return res;
};

export const deleteUser = async (id) => {
  const res = await Api.delete(`/${id}`);
  return res;
};

export const createUser = async (payload) => {
  const res = await Api.post("/", payload);
  return res;
};

export const updateUser = async (id, payload) => {
  const res = await Api.put(`/${id}`, payload);
  return res;
};
