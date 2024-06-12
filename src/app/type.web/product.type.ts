import { ICategory } from './category.type';
import { IStock } from './stock.type';


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
  stock: IStock;
}

enum UnitWeight {
  GRAM = 'GRAM',
  KG = 'KG',
}
