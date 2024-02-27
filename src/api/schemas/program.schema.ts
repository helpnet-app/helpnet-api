import mongoose from 'mongoose';
import { ModeEnum } from 'src/domain/entities/enum/mode_enum';
import { ProgramStatusEnum } from 'src/domain/entities/enum/program_status_enum';

export const ProgramSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
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
