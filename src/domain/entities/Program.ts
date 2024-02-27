import { Company } from './Company';
import { ModeEnum } from './enum/mode_enum';
import { ProgramStatusEnum } from './enum/program_status_enum';

export interface ProgramFile {
  filename: string;
  originalName: string;
}

export interface Program {
  id: string;
  company: Company;
  title: string;
  mode: ModeEnum;
  duration: number;
  description: string;
  type: string;
  nSpots: number;
  tags: string[];
  status: ProgramStatusEnum;
  imageUrl?: string;
  createdAt: Date;
}
