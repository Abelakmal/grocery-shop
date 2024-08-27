export interface IAdmin {
  id: number | null;
  name: string;
  email: string;
  password?: string;
  storeId?: number;
  isSuper?: boolean;
}

export interface jwtPayload {
  id: number;
  isSuper: boolean;
}
