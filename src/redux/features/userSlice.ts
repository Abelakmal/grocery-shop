import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IUser } from "../../types/user.type";
import { AxiosError } from "axios";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axiosInstance.get(`${baseURL}/users/current`);

        return data.data;
      }
      return {
        id: null,
        dob: "",
        email: "",
        image: "",
        name: "",
        phone: "",
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.error || "Server error");
      } else {
        return rejectWithValue("Server error");
      }
    }
  }
);

const user: IUser = {
  id: null,
  dob: "",
  email: "",
  image: "",
  name: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user,
    loading: true,
    error: "",
  },
  reducers: {
    clearCurrentUser: (state: { user: IUser }) => {
      state.user = {
        id: null,
        dob: "",
        email: "",
        image: "",
        name: "",
        phone: "",
      };
      state.user.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message as string;
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
