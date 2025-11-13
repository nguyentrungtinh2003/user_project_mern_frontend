import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthThunk,
  loginThunk,
  registerThunk,
  updateProfileThunk,
} from "./authThunk";
import { hasAtLeastRole, ROLES } from "../../constants/roles";
import { uploadUserImageThunk } from "../users/userThunk";

const initialState = {
  status: "idle",
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout(s) {
      s.user = null;
      s.status = "idle";
      s.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    hydrateFromStorage(s) {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          s.user = JSON.parse(raw);
        } catch {
          s.user = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginThunk.pending, (s) => {
        s.status = "loading";
        s.loading = true;
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.loading = false;
        s.user = a.payload;
        // localStorage.setItem("user", JSON.stringify(a.payload));
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = "failed";
        s.loading = false;
        s.error = a.payload || a.error?.message || "Login failed";
      });
    //register
    builder
      .addCase(registerThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.data = a.payload;
        localStorage.setItem("user", JSON.stringify(a.payload));
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload?.message || a.error?.message || "Register failed";
      });
    //check auth
    builder
      .addCase(checkAuthThunk.pending, (s) => {
        s.status = "loading";
        s.loading = true;
        s.error = null;
      })
      .addCase(checkAuthThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem("user", JSON.stringify(a.payload));
      })
      .addCase(checkAuthThunk.rejected, (s, a) => {
        s.status = "failed";
        s.loading = false;
        s.error = a.payload?.message || a.error?.message || "Session expired";
        s.user = null;
        localStorage.removeItem("user");
      });
    //update profile
    builder
      .addCase(updateProfileThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = { ...s.user, ...a.payload };
        s.loading = false;
        localStorage.setItem("user", JSON.stringify(s.user));
      })
      .addCase(updateProfileThunk.rejected, (s, a) => {
        s.status = "failed";
        s.loading = false;
        s.error = a.payload?.message || a.error?.message || "Update failed";
      })
      .addCase(uploadUserImageThunk.fulfilled, (s, a) => {
        const updated = a.payload; // user đã update
        if (s.user && s.user._id === updated._id) {
          s.user = { ...s.user, ...updated }; // merge ảnh mới
          localStorage.setItem("user", JSON.stringify(s.user));
        }
      });
  },
});
// exporting selectors
export const selectUser = (s) => s.auth.user;
export const selectRole = (s) => s.auth.user?.role;
export const selectIsAuthenticated = (s) => !!s.auth.user;
export const selectIsAdmin = (s) => s.auth.user?.role === ROLES.ADMIN;

export const selectHasRole = (r) => (s) => s.auth.user?.role === r;
export const selectHasAnyRole = (roles) => (s) =>
  roles.includes(s.auth.user?.role);
export const selectHasAtLeast = (minRole) => (s) =>
  hasAtLeastRole(s.auth.user?.role, minRole);

export const selectAuthStatus = (s) => s.auth.status;
export const selectAuthError = (s) => s.auth.error;
export const selectAuthLoading = (s) => s.auth.loading;

// exporting reducers
export const { logout, hydrateFromStorage } = authSlice.actions;

export default authSlice.reducer;
