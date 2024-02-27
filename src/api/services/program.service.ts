import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import { Program } from 'src/domain/entities/Program';
import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';
import { OrganizationService } from './organization.service';

@Injectable()
export class ProgramService implements IProgramService {
  constructor(
    @InjectModel('Program') private readonly programModel: Model<Program>,
    private readonly organizationService: OrganizationService,
  ) {}
  async create(
    organizationId: string,
    newProgram: ProgramToCreateDto,
  ): Promise<Program> {
    const organization =
      await this.organizationService.findById(organizationId);
    if (!organization) {
      throw new ItemNotFoundError(
        `Organização com ID '${organizationId}' não encontrada.`,
      );
    }
    const program = new this.programModel({
      ...newProgram,
      status: ProgramStatusEnum.CREATED,
      createdAt: new Date(),
      organization: organization._id,
    });

    return await program.save();
  }

  async update(
    id: string,
    updatedFields: ProgramToUpdateDto,
  ): Promise<Program> {
    const foundProgram = await this.findById(id);
    if (foundProgram.status == ProgramStatusEnum.FINISHED) {
      throw new Error(
        'Não é possível editar informações de um programa finalizado',
      );
    }
    return await this.programModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
  }

  async deleteById(programId: string): Promise<Program> {
    return await this.programModel.findByIdAndDelete(programId);
  }
  async fetchAll(): Promise<Program[]> {
    return await this.programModel.find().populate('organization').exec();
  }

  async findById(id: string): Promise<Program> {
    const foundProgram = await this.programModel.findById(id);
    return foundProgram;
  }

  async findAllByOrganizationId(organizationId: string): Promise<Program[]> {
    const organization =
      await this.organizationService.findById(organizationId);
    if (!organization) {
      throw new ItemNotFoundError(
        `Organização com ID '${organizationId}' não encontrada.`,
      );
    }
    return await this.programModel
      .find({ organization: organizationId })
      .exec();
  }
}
