export interface ICostumer {
  id: number;
  email: string;
  phone: string;
  username: string;
  verified: boolean;
  referralCode: string;
  referrer: string;
  createdAt: string;
  updatedAt: string;
  profileId: number;
  addressId: number;
  profile: {
    id: number;
    name: string;
    gender: string;
    birth: string;
    avatar: string;
  };
}
