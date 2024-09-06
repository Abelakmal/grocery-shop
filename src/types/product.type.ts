import { ICategory } from "./category.type";
import { IStock } from "./stock.type";
// import { IStock } from './stock.type';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  weight: number;
  unitWeight: string;
  image: string;
  price: string;
  categoryId: number;
  category: ICategory;
  stock: IStock[];
}

export interface IFormProduct {
  name: string;
  description: string;
  weight: number;
  unitWeight: string;
  image: string;
  price: string;
  categoryId: number;
}

export interface IProductWithStock {
  id: number;
  amount: number;
  createdAt: string;
  updateAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    weight: number;
    unitWeight: string;
    image: string;
    price: string;
    category: {
      name: string;
      image: string;
    };
  };
  branchStore: {
    name: string;
    location: string;
  };
}
