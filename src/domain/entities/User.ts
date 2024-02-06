import { Address } from "cluster";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: Address;
  createdAt: Date;
}
