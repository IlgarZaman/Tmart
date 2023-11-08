import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit/dist";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ values, navigate, enqueueSnackbar }) => {
    try {
      const response = await api.signIn(values);
      const message = "Login successfully!";
      const loginSucess = () =>
        enqueueSnackbar(message, { variant: "success" });

      loginSucess();
      navigate("/account");
      return response.data;
    } catch (error) {
      const message = "The email or password you entered is incorrect!";
      const err = () => enqueueSnackbar(message, { variant: "error" });
      err();
      return error;
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ values, navigate, enqueueSnackbar }) => {
    try {
      const response = await api.signUp(values);
      const message = "Register successfully!";
      const registerSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      registerSucess();
      navigate("/");
      return response.data;
    } catch (error) {
      const message = "User already exist, please try login!";
      const err = () => enqueueSnackbar(message, { variant: "info" });
      err();
      return error;
    }
  }
);

export const allUsers = createAsyncThunk("auth/allUsers", async () => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      const message = "User Deleted Successfully!";
      const deleteSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      deleteSucess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const SelectUserById = createAsyncThunk(
  "auth/selectUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.getUserById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ values, id, enqueueSnackbar }, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(values, id);
      const message = "User Updated Successfully!";
      const updateUserSucess = () =>
        enqueueSnackbar(message, { variant: "success" });
      updateUserSucess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateProfileImage = createAsyncThunk(
  "auth/updateProfileImage",
  async ({ userId, formData }) => {
    const response = await api.updateUserImage(userId, formData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loadingUser: false,
    users: [],
    userById: null,
    forAdmin: [],
    localUser: [],
    allUsersWithoutSuperadmin: [],
  },
  reducers: {
    reset: (state, action) => {
      state.userById = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loadingUser = false;
        const userTokenId = {
          id: action.payload.result._id,
          token: action.payload.token,
        };
        localStorage.setItem("user", JSON.stringify({ userTokenId }));
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action?.payload?.message;
      })
      .addCase(register.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loadingUser = false;
        const userTokenId = {
          id: action.payload.result._id,
          token: action.payload.token,
        };
        localStorage.setItem("user", JSON.stringify({ userTokenId }));
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload.message;
      })
      .addCase(allUsers.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loadingUser = false;
        const user = JSON.parse(localStorage.getItem("user"));

        if (user === null) {
          state.localUser = [];
          state.allUsersWithoutSuperadmin = [];
          state.forAdmin = [];
        } else {
          const userTokenId = {
            id: user.userTokenId?.id,
            token: user.userTokenId?.token,
          };
          state.localUser = userTokenId;
          state.allUsersWithoutSuperadmin = action.payload.filter(
            (item) => item.role !== "superAdmin"
          );
          state.forAdmin = state.allUsersWithoutSuperadmin.filter(
            (item) => item.role !== "admin"
          );
        }
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.users = state.users.filter((item) => item._id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload.message;
      })
      .addCase(SelectUserById.fulfilled, (state, action) => {
        const { _id } = action.payload;
        state.userById = state.users.find((item) => item._id === _id);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        const { _id } = action.payload;
        if (_id) {
          state.users = state.users.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload.message;
      })
      .addCase(updateProfileImage.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loadingUser = false;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload.message;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAllUsersWithoutSuperadmin = (state) =>
  state.auth.allUsersWithoutSuperadmin;
export const selectForAdmin = (state) => state.auth.forAdmin;
export const selectAllUsers = (state) => state.auth.users;
export const selectLocalUser = (state) => state.auth.localUser;
export const uselectUserById = (state) => state.auth.userById;
export const selectUserLoading = (state) => state.auth.loadingUser;
export const selectError = (state) => state.auth.error;

export const { setUser, setLogout, reset } = authSlice.actions;
export default authSlice.reducer;
