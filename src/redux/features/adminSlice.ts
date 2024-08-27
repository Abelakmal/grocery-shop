import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IAdmin } from "../../types/admin.type";

export const fetchCurrentAdmin = createAsyncThunk(
  "user/fetchCurrentAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${baseURL}/admin/current`);

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const admin: IAdmin = {
  id: null,
  email: "",
  name: "",
  storeId: 0,
  isSuper: undefined
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin,
    loading: true,
    error: "",
  },
  reducers: {
    clearCurrentAdmin: (state: any) => {
      state.admin = null;
      state.admin.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchCurrentAdmin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message as string;
      });
  },
});

export const { clearCurrentAdmin } = adminSlice.actions;

export default adminSlice.reducer;
