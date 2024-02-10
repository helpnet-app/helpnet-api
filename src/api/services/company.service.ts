import { Company } from "src/domain/entities/Company";
import { ICompanyService } from "src/domain/ports/icompany_service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanyService implements ICompanyService {
    companies: Company[] = []

    create(newCompany: Company): Promise<Company> {
        const createdCompany = { ...newCompany }; // Create a copy of newCompany
        this.companies.push(createdCompany);
        return Promise.resolve(createdCompany);
    }

    update(id: string, companyToUpdate: Company): Promise<Company> {
        const companyIndex = this.companies.findIndex(company => company.id === id);
        if (companyIndex !== -1) {
            this.companies[companyIndex] = { ...companyToUpdate }; // Update company properties
            return Promise.resolve(this.companies[companyIndex]);
        }
        return Promise.reject(new Error("Company not found"));
    }

    deleteById(id: string): Promise<Company> {
        const companyIndex = this.companies.findIndex(company => company.id === id);
        if (companyIndex !== -1) {
            const deletedCompany = this.companies.splice(companyIndex, 1)[0];
            return Promise.resolve(deletedCompany);
        }
        return Promise.reject(new Error("Company not found"));
    }

    findById(id: string): Promise<Company> {
        const foundCompany = this.companies.find(company => company.id === id);
        if (foundCompany) {
            return Promise.resolve(foundCompany);
        }
        return Promise.reject(new Error("Company not found"));
    }

    fetchAll(): Promise<Company[]> {
        return Promise.resolve(this.companies);
    }
}
