// UTILIZAR DTOS

import { ProgramToCreate } from '../dtos/program/programToCreate';
import { Program } from '../entities/Program';

export interface IProgramService {
  create(newProgram: ProgramToCreate, companyId: string): Promise<Program>;
  update(programId: number, updatedFields: Partial<Program>): Promise<Program>;
  deleteById(programId: number): Promise<Program>;
  fetchAll(): Promise<Program[]>;
  fetchByCompany(companyId: number): Promise<Program[]>;
  
}
