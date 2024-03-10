import { api } from "./api";

const getUserById = async (id) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

const updateUser = async (
  userId,
  { email, firstName, lastName, phoneNumber, userPhotoURL }
) => {
  const { data } = await api.put(`/user/update/${userId}`, {
    email,
    firstName,
    lastName,
    phoneNumber,
    userPhotoURL,
  });
  return data;
};

export { getUserById, updateUser };
