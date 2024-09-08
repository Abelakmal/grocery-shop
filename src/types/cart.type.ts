import { IAddress } from "./address.type";
import { IStock } from "./stock.type";

export interface ICart {
  id: number;
  stock_id: number;
  user_id: number;
  quantity: number;
  price_at_time: number;
  stock: IStock;
  address_id: number;
  address: IAddress;
}

export interface ICartForm {
  stock_id: number;
  user_id: number;
  quantity: number;
  price_at_time: number;
  address_id: number;
}
