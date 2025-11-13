import {
  ALLUSER_URL,
  USERBYID_URL,
  UPDATEUSER_URL,
} from "../constants/constants";
import instance from "./axios";

const getAllUser = () => {
  return instance.get(ALLUSER_URL);
};

const getUserById = (userId) => {
  return instance.get(USERBYID_URL + `${userId} `);
};

const updateUserById = (userId, cred) => {
  return instance.put(UPDATEUSER_URL + `/${userId}`, cred);
};

const uploadUserImage = (userId, img) => {
  return instance.patch(USERBYID_URL + `${userId}/avatar`, img);
};

export { getAllUser, getUserById, updateUserById, uploadUserImage };
