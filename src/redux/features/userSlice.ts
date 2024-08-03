import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IUser } from "../../types/user.type";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${baseURL}/users/current`);

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
    clearCurrentUser: (state: any) => {
      state.user = null;
      state.user.id = null
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
