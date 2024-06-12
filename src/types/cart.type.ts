export interface IAddToCart {
  productId: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  seller: string;
  quantity: any;
}

export interface IItemProduct {
  categoryId: number;
  id: number;
  image: string;
  location: string;
  name: string;
  price: number;
}

export interface IStoreBranch {
  id: number;
  name: string;
  adminId: number;
  voucherId: number;
  latitude: string;
  longitude: string;
  cityId: number;
}

export interface IProduct {
  id: number;
  productId: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  branchId: number;
  product: IItemProduct;
  storeBranch: IStoreBranch;
}
