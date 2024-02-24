import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

export const ProgramFilesSchema = new mongoose.Schema({
  programId: { type: mongoose.Schema.Types.ObjectId, required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
});

@Injectable()
export class ProgramFilesService {}
