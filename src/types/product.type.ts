import { ICategory } from "./category.type";
import { IStock } from "./stock.type";
// import { IStock } from './stock.type';

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  weight: number;
  unitWeight: UnitWeight;
  image: string;
  price: number;
  categoryId: number;
  category: ICategory;
  stock: IStock[];
}

enum UnitWeight {
  GRAM = "GRAM",
  KG = "KG",
}

export interface IProductWithStock {
  id: number;
  amount: number;
  createdAt: string;
  updateAt: string;
  product: {
    name: string;
    description: string;
    weight: number;
    unitWeight: string;
    image: string;
    price: number;
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
