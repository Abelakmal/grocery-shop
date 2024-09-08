import { IStock } from "./stock.type";

export interface ITransactionResponse {
  id: string;
  status: string;
  customer_name: string;
  customer_email: string;
  stock: IStock[];
  snap_token: string;
  snap_redirect_url: string;
}

export interface ITransaction {
  id: string;
  total: number;
  status: string;
  userId: number;
  snap_token: string | null;
  snap_redirect_url: string | null;
  payment_method: string | null;
  payment_link: string | null;
  va_number: string | null;
  address_id: number;
  createdAt: string;
  updatedAt: string;
  transactions_items: ITransactionsItem[];
}

export interface ITransactionsItem {
  id: string;
  price: number;
  quantity: number;
  stock: IStock;
}
