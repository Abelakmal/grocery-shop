import { IProduct } from "./product.type";

export interface ICategory {
  id: number;
  name: string;
  image?: string;
  products?: IProduct[];
}

export interface IFormCatgeory {
  name: string;
  image: string;
}
