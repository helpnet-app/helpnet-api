import { Address } from "cluster";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: Address;
  phone: string;
  createdAt: Date;
}
