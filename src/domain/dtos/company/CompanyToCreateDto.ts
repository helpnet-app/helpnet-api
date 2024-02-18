import { UserToCreateDto } from '../user/UserToCreateDto';

export interface CompanyToCreateDto extends UserToCreateDto {
  tradeName: string;
}
