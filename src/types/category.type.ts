import { IProduct } from "./product.type";

export interface ICategory {
  id: number;
  name: string;
  image?: string;
  product?: IProduct[];
}

export interface IFormCatgeory {
  name: string;
  image: string;
}
