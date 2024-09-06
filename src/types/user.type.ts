export interface IUser {
  id: number | null;
  name: string;
  dob: string;
  email: string;
  phone: string;
  address?: string;
  image: string;
}

export interface IFormRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAgree: boolean;
  dob: string;
  phone: string;
  address: string;
  confirmPassword: string;
  error: string
}
