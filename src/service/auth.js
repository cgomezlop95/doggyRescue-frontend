import { api } from "./api";

const postLogin = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });
  return data;
};

const postRegister = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}) => {
  const { data } = await api.post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  });
  return data;
};

const isUserLoggedIn = async () => {
  const { data } = await api.get("/auth/logged-in");
  return data;
};

const clearCookie = async () => {
  const { data } = await api.get("/auth/logout");
  return data;
};

export { postLogin, postRegister, isUserLoggedIn, clearCookie };
