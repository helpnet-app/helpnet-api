import { IUserService } from "./iuser_service";
import { Company } from "../entities/Company";

export interface ICompanyService extends IUserService{
    create(newCompany: Company): Promise<Company>
    update(id: string, companyToUpdate: Company): Promise<Company>;
    deleteById(id: string): Promise<Company>;
    findById(id: string): Promise<Company>;
    fetchAll(): Promise<Company[]>;
}