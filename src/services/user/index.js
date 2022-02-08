import { Api } from "../../helpers/api";

export const getUsers = async () => {
  const res = await Api.get("/");
  return res;
};

export const deleteUser = async (id) => {
  const res = await Api.delete(`/${id}`);
  return res;
};

export const createUser = async (data) => {
  const res = await Api.post("/", data);
  return res;
};
