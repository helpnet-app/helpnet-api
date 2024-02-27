import { User } from './User';

export interface Organization extends User {
  tradeName: string;
  CNPJ: string;
}
