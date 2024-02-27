import { Program } from '../entities/Program';
import { Volunteer } from '../entities/Volunteer';

export interface IPDFManagerService {
  buildPDF(program: Program, user: Volunteer, verificationCode: string);
}
