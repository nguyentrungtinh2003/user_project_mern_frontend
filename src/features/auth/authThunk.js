import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";
import { getUserById, updateUserById } from "../../services/userService";

const loginThunk = createAsyncThunk(
  "auth/login",
  async (cred, { rejectWithValue }) => {
    try {
      const res = await login(cred);
      if (res?.token) localStorage.setItem("token", res.token);
      if (res?.user) localStorage.setItem("user", JSON.stringify(res.user));
      return res.user;
    } catch (err) {
      const status = err?.response.status;
      const payload = err?.response.data.message ?? {
        message: err?.response.data.message || "Login failed",
      };
      const message = status + " " + payload;
      return rejectWithValue(message);
    }
  },
);

const registerThunk = createAsyncThunk(
  "auth/register",
  async (cred, { dispatch, rejectWithValue }) => {
    try {
      const res = await register(cred);
      if (res) {
        const loginSuccess = await dispatch(loginThunk(cred));
        return loginSuccess.payload;
      }
      return res?.message;
    } catch (err) {
      const status = err?.response?.status;
      const payload = err?.response?.data.message ?? {
        message: err?.response.data.message || "Register failed",
      };
      const message = status + " " + payload;
      return rejectWithValue(message);
    }
  },
);

const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (UserId, { rejectWithValue }) => {
    try {
      const res = await getUserById(UserId);
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        return res.data.user;
      }
      return rejectWithValue("Not exist user information");
    } catch (err) {
      const status = err.response?.status;
      const payload = err.response?.data?.message ?? {
        message: err.message || "Session Expiration",
      };
      return rejectWithValue({ status, ...payload });
    }
  },
);

// const logoutThunk = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await logout();
//       return res.data;
//     } catch (err) {
//       const status = err.response?.status;
//       const payload = err.response?.data ?? { message: err.message };
//       return rejectWithValue({ status, ...payload });
//     }
//   },
// );

const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async ({ data, userId }, { rejectWithValue, getState }) => {
    try {
      const id = userId ?? getState().auth.user?._id;
      const res = await updateUserById(id, data);
      return res?.userUpdate ?? { _id: id, ...getState().auth.user, ...data };
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message ?? {
        message: err.message || "Uppdate failed",
      };
      return rejectWithValue({ status, ...message });
    }
  },
);

export { loginThunk, registerThunk, checkAuthThunk, updateProfileThunk };
