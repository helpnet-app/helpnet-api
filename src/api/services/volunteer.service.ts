import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VolunteerToCreateDto } from 'src/domain/dtos/volunteer/VolunteerToCreateDto';
import { Volunteer } from 'src/domain/entities/Volunteer';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { IVolunteerService } from 'src/domain/ports/ivolunteer_service';

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
      throw new ItemNotFoundError('Voluntário não encontrado');
    }
    return updatedVolunteer;
  }

  async deleteById(id: string): Promise<Volunteer> {
    const deletedVolunteer = await this.volunteerModel.findByIdAndDelete(id);
    if (!deletedVolunteer) {
      throw new ItemNotFoundError('Voluntário não encontrado');
    }
    return deletedVolunteer;
  }

  async findById(id: string): Promise<Volunteer> {
    const foundVolunteer = await this.volunteerModel.findById(id);
    if (!foundVolunteer) {
      throw new ItemNotFoundError('Voluntário não encontrado');
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

  async findOne(field: string, value: string) {
    return await this.volunteerModel.findOne({ [field]: value }).exec();
  }
}
