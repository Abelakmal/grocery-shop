import { IProduct } from "./product.type";

export interface ICategory {
    id: string;
    name: string;
    image: string;
    product: IProduct[]
  }
  