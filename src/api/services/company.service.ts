import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CompanyToCreateDto } from 'src/domain/dtos/company/CompanyToCreateDto';
import { CompanyToUpdateDto } from 'src/domain/dtos/company/CompanyToUpdateDto';
import { Company } from 'src/domain/entities/Company';
import { ItemNotCreatedError } from 'src/domain/exceptions/item_not_created_error';
import { ICompanyService } from 'src/domain/ports/icompany_service';

export const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: Object, required: true },
  createdAt: { type: Date, required: false },
  tradeName: { type: String, required: true },
});

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async create(newCompany: CompanyToCreateDto): Promise<Company> {
    try {
      const createdCompany = new this.companyModel(newCompany);
      const result = await createdCompany.save();
      return result;
    } catch (error) {
      throw new ItemNotCreatedError('Não foi possível criar novo perfil');
    }
  }

  async update(
    id: string,
    companyToUpdate: CompanyToUpdateDto,
  ): Promise<Company> {
    const updatedCompany = await this.companyModel.findByIdAndUpdate(
      id,
      companyToUpdate,
      { new: true },
    );
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
    return foundCompany;
  }

  async fetchAll(): Promise<Company[]> {
    const companies = await this.companyModel.find().exec();
    return companies;
  }

  async findOne(field: string, value: string) {
    return await this.companyModel.findOne({ [field]: value }).exec();
  }
}
