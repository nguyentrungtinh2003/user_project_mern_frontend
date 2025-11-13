import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadUserImage } from "../../services/userService";
// import {
//   createUser,
//   deleteUser,
//   fetchAllUser,
//   fetchUsers,
//   updateUser,
// } from "../../services/userService";

// const fetchUsersThunk = createAsyncThunk(
//   "users/fetchUsers",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await fetchUsers(userId);
//       return [...response.data];
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// const fetchAllUsersThunk = createAsyncThunk(
//   "users/fetchAllUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchAllUser();
//       return [...response.data.users];
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   },
// );

// const createUserThunk = createAsyncThunk(
//   "users/create",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await createUser(payload);
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.res?.data ?? { message: err.message });
//     }
//   },
// );

// const updateUserThunk = createAsyncThunk(
//   "users/update",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const res = await updateUser(id, data);
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.res?.data ?? { message: err.message });
//     }
//   },
// );

// const deleteUserThunk = createAsyncThunk(
//   "user/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await deleteUser(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.res?.data ?? { message: err.message });
//     }
//   },
// );

const uploadUserImageThunk = createAsyncThunk(
  "user/uploadImage",
  async ({ userId, file }, { rejectWithValue, getState }) => {
    try {
      const id = userId ?? getState().auth.user?._id;
      const res = await uploadUserImage(id, file);
      return res?.user ?? { _id: id, ...getState().auth.user, ...file };
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message ?? {
        message: err.message || "Upload image failed",
      };
      return rejectWithValue({ status, ...message });
    }
  },
);

export {
  // fetchUsersThunk,
  // fetchAllUsersThunk,
  // createUserThunk,
  // updateUserThunk,
  // deleteUserThunk,
  uploadUserImageThunk,
};
