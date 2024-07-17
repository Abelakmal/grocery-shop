import { ICategory } from './category.type';
// import { IStock } from './stock.type';


export interface IProduct {
  id?: number;
  name: string;
  description: string;
  weight: number;
  unitWeight: UnitWeight;
  image: string;
  price: number;
  category: ICategory;
  stock: number
}

enum UnitWeight {
  GRAM = 'GRAM',
  KG = 'KG',
}
