import { createSlice } from "@reduxjs/toolkit";
import { uploadUserImageThunk } from "./userThunk";
// import {
//   fetchAllUsersThunk,
//   createUserThunk,
//   updateUserThunk,
//   deleteUserThunk,
// } from "./userThunk";

const initialState = {
  list: [],
  status: "idle", //idle|loading|successded|failed
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserImageThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadUserImageThunk.fulfilled, (state, action) => {
        state.status = "successded";
        const updated = action.payload;
        const i = state.list.findIndex((u) => u._id === updated);
        if (i > -1) state.list[i] = { ...state.list[i], ...updated };
      })
      .addCase(uploadUserImageThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error || action.payload;
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
