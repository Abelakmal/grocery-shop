import { IStoreBranch } from "./store.type";

export interface IAdmin {
  id: number | null;
  name: string;
  email: string;
  password?: string;
  storeId?: number;
  isSuper?: boolean;
  store_branch?: IStoreBranch;
}

export interface IFormAdmin {
  name: string;
  email: string;
  password: string;
  storeId: number;
}

export interface jwtPayload {
  id: number;
  isSuper: boolean;
}
