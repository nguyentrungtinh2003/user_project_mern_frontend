import { LOGIN_URL, REGISTER_URL } from "../constants/constants";
import instance from "./axios";

const login = (cerd) => {
  return instance.post(LOGIN_URL, cerd);
};

const register = (cerd) => {
  return instance.post(REGISTER_URL, cerd);
};

export { login, register };
