import { UserToUpdateDto } from "../user/UserToUpdateDto";
import { Company } from "src/domain/entities/Company";

export interface CompanyToUpdateDto extends UserToUpdateDto {
    userToUpdate: Company
}