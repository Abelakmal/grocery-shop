import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../types/cart.type";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    quantity: 0,
  },
  reducers: {
    countCart(state, action: PayloadAction<ICart[]>) {

      
      const data = action.payload;

      state.total = data.reduce(
        (total: number, cart: ICart) =>
          total + cart.price_at_time * cart.quantity,
        0
      );
      

      state.quantity = data.reduce(
        (total: number, cart: ICart) => total + cart.quantity,
        0
      );
    },
  },
});

export const { countCart } = cartSlice.actions;

export default cartSlice.reducer;
