import { Organization } from './Organization';
import { ModeEnum } from './enum/mode_enum';
import { ProgramStatusEnum } from './enum/program_status_enum';

export interface ProgramOrganizationResponse {
  programs: Program[];
  organization: Organization;
}

export interface Program {
  id: string;
  organizationId: string;
  title: string;
  mode: ModeEnum;
  status: ProgramStatusEnum;
  duration: number;
  description: string;
  type: string;
  nSpots: number;
  tags: string[];
  createdAt: Date;
}