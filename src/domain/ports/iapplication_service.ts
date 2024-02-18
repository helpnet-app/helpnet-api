import { ApplicationToUpdateDTO } from '../dtos/application/ApplicationToUpdateDto';
import { Application, Questions } from '../entities/Application';

export interface IApplicationService {
  volunteerApplyProgram(
    volunteerId: string,
    programId: string,
    questions: Questions,
  ): Promise<Application>;
  fetchAllVolunteerApplicationByProgram(programId: string);
  findAllAppliedPrograms(volunteerId: string);
  update(
    applicationId: string,
    applicationToUpdate: ApplicationToUpdateDTO,
  ): Promise<Application>;
  updateManyByProgramId(programId: string, field: string, newValue: any);
  delete(applicationId: string): Promise<Application>;
  findApplicationByVolunteerId(volunteerId: string): Promise<Application>;
}
