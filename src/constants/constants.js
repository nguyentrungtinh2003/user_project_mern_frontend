//origin URL
const baseURL = import.meta.env.VITE_BASE_URL; /*||
  (import.meta.env.DEV ? "http://localhost:3306" : "");*/
// const baseURL = "http://localhost:3306/api/";
//auth
const authURL = import.meta.env.VITE_AUTH_URL;
const LOGIN_URL = authURL + "login";
const REGISTER_URL = authURL + "register";

//user
const userURL = import.meta.env.VITE_USER_URL;

const ALLUSER_URL = userURL + "all";
const USERBYPAGE_URL = userURL + "page";
const SEARCHUSER_URL = userURL + "search";
const USERBYID_URL = userURL;
const UPDATEUSER_URL = userURL + "update";
const DELETEUSER_URL = userURL + "delete/:id";

//project
const projectURL = import.meta.env.VITE_PROJECT_URL;

//enroll
const enrollURL = import.meta.env.VITE_ENROLL_URL;

export {
  baseURL,
  LOGIN_URL,
  REGISTER_URL,
  ALLUSER_URL,
  USERBYPAGE_URL,
  SEARCHUSER_URL,
  USERBYID_URL,
  UPDATEUSER_URL,
  DELETEUSER_URL,
};
