import { ICostumer } from './costumer.type';
import { IProduct } from './product.type';
import { IStoreBranch } from './store.type';

export interface IOrder {
  id: number;
  uuid: string;
  qty: number;
  amount: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  paymentProof: boolean;
  productId: number;
  costumerId: number;
  branchId: number;
  statusId: number;
  product: IProduct;
  StoreBranch: IStoreBranch;
  customer: ICostumer
}
