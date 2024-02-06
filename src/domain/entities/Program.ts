import { Company } from './Company';
import { ModeEnum } from './enum/mode_Enum';
import { ProgramStatusEnum } from './enum/program_status_enum';

export interface Program {
  id: string;
  company: Company;
  title: string;
  mode: ModeEnum;
  duration: number;
  expiresIn: number;
  description: string;
  type: string;
  nSpots: number;
  status: ProgramStatusEnum;
}