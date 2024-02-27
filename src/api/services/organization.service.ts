import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationToCreateDto } from 'src/domain/dtos/organization/OrganizationToCreateDto';
import { Organization } from 'src/domain/entities/Organization';
import { ItemNotCreatedError } from 'src/domain/exceptions/item_not_created_error';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IOrganizationService } from 'src/domain/ports/iorganization_service';
import { OrganizationToUpdateDto } from '../../domain/dtos/organization/OrganizationToUpdateDto';

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @InjectModel('Organization')
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(
    newOrganization: OrganizationToCreateDto,
  ): Promise<Organization> {
    try {
      const createdorganization = new this.organizationModel(newOrganization);
      const result = await createdorganization.save();
      return result;
    } catch (error) {
      throw new ItemNotCreatedError('Não foi possível criar novo perfil');
    }
  }

  async update(
    id: string,
    organizationToUpdate: OrganizationToUpdateDto,
  ): Promise<Organization> {
    const updatedorganization = await this.organizationModel.findByIdAndUpdate(
      id,
      organizationToUpdate,
      { new: true },
    );
    if (!updatedorganization) {
      throw new ItemNotFoundError('Organização não encontrada');
    }
    return updatedorganization;
  }

  async deleteById(id: string): Promise<Organization> {
    const deletedOrganization =
      await this.organizationModel.findByIdAndDelete(id);
    if (!deletedOrganization) {
      throw new ItemNotFoundError('Organização não encontrada');
    }
    return deletedOrganization;
  }

  async findById(id: string): Promise<Organization> {
    const foundorganization = await this.organizationModel.findById(id);
    return foundorganization;
  }

  async fetchAll(): Promise<Organization[]> {
    const organizations = await this.organizationModel.find().exec();
    return organizations;
  }

  async findOne(field: string, value: string) {
    return await this.organizationModel.findOne({ [field]: value }).exec();
  }
}
