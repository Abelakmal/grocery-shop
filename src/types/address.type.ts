export interface IAddress {
  id: number | null;
  label: string;
  details: string;
  location: string;
  recipient_name: string;
  recipient_number: string;
  latitude: string;
  longitude: string;
  main: boolean;
  userId: number;
}

export interface IFormAddress {
  label: string;
  details: string;
  location: string;
  recipient_name: string;
  recipient_number: string;
  latitude: string;
  longitude: string;
  main: boolean;
}
