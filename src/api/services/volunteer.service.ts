import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { VolunteerToCreateDto } from 'src/domain/dtos/volunteer/VolunteerToCreateDto';
import { Volunteer } from 'src/domain/entities/Volunteer';
import { IVolunteerService } from 'src/domain/ports/ivolunteer_service';

export const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: Object, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  birthDate: { type: Date, required: true },
});

@Injectable()
export class VolunteerService implements IVolunteerService {
  constructor(
    @InjectModel('Volunteer') private readonly volunteerModel: Model<Volunteer>,
  ) {}

  async create(newVolunteer: VolunteerToCreateDto): Promise<Volunteer> {
    const createdVolunteer = new this.volunteerModel(newVolunteer);
    const result = await createdVolunteer.save();
    return result;
  }

  async update(id: string, volunteerToUpdate: Volunteer): Promise<Volunteer> {
    const updatedVolunteer = await this.volunteerModel.findByIdAndUpdate(
      id,
      volunteerToUpdate,
      { new: true },
    );
    if (!updatedVolunteer) {
      throw new NotFoundException('Volunteer not found');
    }
    return updatedVolunteer;
  }

  async deleteById(id: string): Promise<Volunteer> {
    const deletedVolunteer = await this.volunteerModel.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      throw new NotFoundException('Volunteer not found');
    }
    return deletedVolunteer;
  }

  async findById(id: string): Promise<Volunteer> {
    const foundVolunteer = await this.volunteerModel.findById(id);
    if (!foundVolunteer) {
      throw new NotFoundException('Volunteer not found');
    }
    return foundVolunteer;
  }

  async fetchAll(): Promise<Volunteer[]> {
    const volunteers = await this.volunteerModel.find().exec();
    return volunteers;
  }

  async fetchVolunteersByIds(volunteersId: string[]): Promise<Volunteer[]> {
    return await this.volunteerModel
      .find({ _id: { $in: volunteersId } })
      .exec();
  }
}
