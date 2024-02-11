import { Company } from "src/domain/entities/Company";
import { ICompanyService } from "src/domain/ports/icompany_service";
import { Injectable, NotFoundException } from "@nestjs/common";
import * as mongoose from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export const CompanySchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    createdAt: {type: Date, required: true},
    tradeName: {type: String, required: true},
})


@Injectable()
export class CompanyService implements ICompanyService {

    constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

    async create(newCompany: Company): Promise<Company> {
        const createdCompany = new this.companyModel(newCompany);
        const result = await createdCompany.save();
        return result;
    }

    async update(id: string, companyToUpdate: Company): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(id, companyToUpdate, { new: true });
        if (!updatedCompany) {
            throw new NotFoundException('Company not found');
        }
        return updatedCompany;
    }

    async deleteById(id: string): Promise<Company> {
        const deletedCompany = await this.companyModel.findByIdAndDelete(id);
        if (!deletedCompany) {
            throw new NotFoundException('Company not found');
        }
        return deletedCompany;
    }

    async findById(id: string): Promise<Company> {
        const foundCompany = await this.companyModel.findById(id);
        if (!foundCompany) {
            throw new NotFoundException('Company not found');
        }
        return foundCompany;
    }

    async fetchAll(): Promise<Company[]> {
        const companies = await this.companyModel.find().exec();
        return companies;
    }
}
