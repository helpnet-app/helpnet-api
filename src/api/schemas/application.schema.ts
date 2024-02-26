import mongoose from "mongoose";
import { ApplicationStatusEnum } from "src/domain/entities/enum/application_status_enum";

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