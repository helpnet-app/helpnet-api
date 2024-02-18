import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import { Program } from 'src/domain/entities/Program';
import { ModeEnum } from 'src/domain/entities/enum/mode_Enum';
import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';
import { CompanyService } from './company.service';

export const ProgramSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  title: { type: String, required: true },
  mode: { type: Number, enum: ModeEnum, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  nSpots: { type: Number, required: true },
  tags: { type: [{ type: String }], required: true },
  status: { type: Number, enum: ProgramStatusEnum, required: true },
  createdAt: { type: Date, required: true },
});

@Injectable()
export class ProgramService implements IProgramService {
  constructor(
    @InjectModel('Program') private readonly programModel: Model<Program>,
    private readonly companyService: CompanyService,
  ) {}
  async create(
    companyId: string,
    newProgram: ProgramToCreateDto,
  ): Promise<Program> {
    const company = await this.companyService.findById(companyId);
    if (!company) {
      throw new ItemNotFoundError(
        `Organização com ID '${companyId}' não encontrada.`,
      );
    }
    const program = new this.programModel({
      ...newProgram,
      status: ProgramStatusEnum.CREATED,
      createdAt: new Date(),
      company: company._id,
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
    return await this.programModel.find().exec();
  }

  async findById(id: string): Promise<Program> {
    const foundProgram = await this.programModel.findById(id);
    return foundProgram;
  }

  async findAllByCompanyId(companyId: string): Promise<Program[]> {
    const company = await this.companyService.findById(companyId);
    if (!company) {
      throw new ItemNotFoundError(
        `Organização com ID '${companyId}' não encontrada.`,
      );
    }
    return await this.programModel.find({ company: companyId }).exec();
  }
}
