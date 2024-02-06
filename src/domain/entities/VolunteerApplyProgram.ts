import { Program } from './Program';
import { Volunteer } from './Volunteer';
import { StatusEnum } from './enum/status_enum';

export interface VolunteerApplyProgram {
  status: StatusEnum;
  volunteer: Volunteer;
  program: Program;
  appliedAt: Date;
  finishedAt: Date;
  createdAt: Date;
}
