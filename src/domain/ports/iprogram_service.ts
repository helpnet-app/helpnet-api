import { ProgramToCreateDto } from '../dtos/program/ProgramToCreateDto';
import { Program } from '../entities/Program';

export interface IProgramService {
  create(companyId: string, newProgram: ProgramToCreateDto, pictureLink: string): Promise<Program>; // Updated to accept imageFile
  update(id: string, updatedFields: Partial<Program>): Promise<Program>;
  findById(id: string): Promise<Program>;
  deleteById(programId: string): Promise<Program>;
  fetchAll(): Promise<Program[]>;
  findAllByOrganizationId(organizationId: string): Promise<Program[]>;
}
