import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramToCreateDto } from 'src/domain/dtos/program/ProgramToCreateDto';
import { Program } from 'src/domain/entities/Program';
import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IProgramService } from 'src/domain/ports/iprogram_service';
import * as cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { ProgramToUpdateDto } from 'src/domain/dtos/program/ProgramToUpdateDto';
import mongoose from 'mongoose';
import { env } from 'process';
import { OrganizationService } from './organization.service';
import { ModeEnum } from 'src/domain/entities/enum/mode_enum';


export const ProgramSchema = new mongoose.Schema({
  organization: {
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
  pictureLink: { type: String, required: true } // Assuming the image is stored as a base64 string
});

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
    const cloud_name =  env.CLOUDINARY_CLOUD_NAME
    const api_key = env.CLOUDINARY_API_KEY
    const api_secret = env.CLOUDINARY_API_SECRET

    cloudinaryV2.config({
      cloud_name: cloud_name,
      api_key: api_key,
      api_secret: api_secret,
    });

    const organization = await this.organizationService.findById(organizationId);
    if (!organization) {
      throw new ItemNotFoundError(
        `Organização com ID '${organizationId}' não encontrada.`,
      );
    }

    const uploadedImage = await this.uploadImage(newProgram.pictureLink); // Upload image to cloudinary

    const program = new this.programModel({
      ...newProgram,
      pictureLink: uploadedImage.secure_url, // Store the URL of the uploaded image
      status: ProgramStatusEnum.CREATED,
      createdAt: new Date(),
      organization: organization._id,
    });

    return await program.save();
  }

  async uploadImage(image: string): Promise<cloudinary.UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinaryV2.uploader.upload(image, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
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
