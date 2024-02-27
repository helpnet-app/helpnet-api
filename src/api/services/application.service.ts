import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ApplicationToUpdateDTO } from 'src/domain/dtos/application/ApplicationToUpdateDto';
import { Application, Questions } from 'src/domain/entities/Application';
import { ApplicationStatusEnum } from 'src/domain/entities/enum/application_status_enum';
import { IApplicationService } from 'src/domain/ports/iapplication_service';
import { VolunteerService } from './volunteer.service';

export const ApplicationSchema = new mongoose.Schema({
  status: { type: Number, enum: ApplicationStatusEnum, required: true },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  appliedAt: { type: Date, required: true },
  finishedAt: { type: Date },
  createdAt: { type: Date },
  questions: {
    schedule: {
      days: [String],
      period: [String],
    },
    personalDescription: String,
    experience: String,
  },
});

@Injectable()
export class ApplicationService implements IApplicationService {
  constructor(
    @InjectModel('Application')
    private readonly applicationModel: Model<Application>,
    private readonly volunteerService: VolunteerService,
  ) {}
  async fetchApplicationInfo(programId: string, volunteerId: string) {
    return await this.applicationModel
      .findOne({
        volunteer: volunteerId,
        program: programId,
      })
      .populate('volunteer')
      .populate('program');
  }

  async findApplication(programId: string) {
    return await this.applicationModel.findOne({ program: programId }).exec();
  }

  async volunteerApplyProgram(
    volunteerId: string,
    programId: string,
    questions: Questions,
  ): Promise<Application> {
    const application = new this.applicationModel({
      volunteer: volunteerId,
      program: programId,
      appliedAt: new Date(),
      finishedAt: null,
      status: ApplicationStatusEnum.SUBMITTED,
      questions: questions,
    });
    return await application.save();
  }

  async fetchAllVolunteerApplicationByProgram(programId: string) {
    const applications = await this.applicationModel
      .find({
        program: programId,
        status: {
          $in: [
            ApplicationStatusEnum.SUBMITTED,
            ApplicationStatusEnum.APPROVED,
          ],
        },
      })
      .exec();
    const volunteersId = applications.map(
      (application) => application.volunteer,
    );
    const volunteersInfo =
      await this.volunteerService.fetchVolunteersByIds(volunteersId);
    const applicationsWithVolunteers = applications.map((application) => {
      const volunteer = volunteersInfo.find(
        (volunteer) =>
          volunteer._id.toString() === application.volunteer.toString(),
      );
      return {
        application,
        associatedVolunteer: volunteer,
      };
    });

    return applicationsWithVolunteers;
  }

  async findAllAppliedPrograms(volunteerId: string) {
    const applications = await this.applicationModel
      .find({ volunteer: volunteerId })
      .populate('volunteer')
      .exec();

    return applications;
  }

  async update(
    applicationId: string,
    applicationToUpdate: ApplicationToUpdateDTO,
  ): Promise<Application> {
    return await this.applicationModel.findByIdAndUpdate(
      applicationId,
      applicationToUpdate,
      {
        new: true,
      },
    );
  }

  async updateManyByProgramId(programId: string, field: string, newValue: any) {
    await this.applicationModel.updateMany(
      { program: programId },
      { $set: { [field]: newValue } },
    );
    return await this.applicationModel.find({ program: programId });
  }

  async delete(applicationId: string): Promise<Application> {
    return await this.applicationModel.findByIdAndUpdate(applicationId);
  }

  async findApplicationByVolunteerId(volunteerId: string) {
    return await this.applicationModel
      .findOne({ volunteer: volunteerId })
      .exec();
  }
}
