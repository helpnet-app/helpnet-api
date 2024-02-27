// UTILIZAR DTOS

import { ProgramToCreateDto } from '../dtos/program/ProgramToCreateDto';
import { Program } from '../entities/Program';

export interface IProgramService {
  create(
    organizationId: string,
    newProgram: ProgramToCreateDto,
  ): Promise<Program>;
  update(id: string, updatedFields: Partial<Program>): Promise<Program>;
  findById(id: string): Promise<Program>;
  deleteById(programId: string): Promise<Program>;
  fetchAll(): Promise<Program[]>;
  findAllByOrganizationId(organizationId: string): Promise<Program[]>
}
