import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { IAddress } from "../../types/address.type";

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${baseURL}/address`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const address: IAddress[] = [
  {
    id: null,
    details: "",
    label: "",
    recipient_name: "",
    recipient_number: "",
    main: false,
    latitude: "",
    longitude: "",
    userId: 1,
  },
];

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address,
    loading: false,
    error: "",
  },
  reducers: {
    clearCurrentAddress: (state: any) => {
      state.address = null;
      state.address.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { clearCurrentAddress } = addressSlice.actions;

export default addressSlice.reducer;
