import { Address } from "src/domain/entities/Address";

export interface UserToCreateDto {
  name: string;
  email: string;
  password: string;
  address: Address;
  phone: string;
}
