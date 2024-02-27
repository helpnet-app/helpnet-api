import { Application } from '../entities/Application';

export interface ICertificateService {
  // generatePDF(programId: string, volunteerId: string);
  // buildPDF(program: Program, volunteer: Volunteer);
  createCertificatesFromUpdatedApplications(applications: Application[]);
  generateCertificate(programId: string, volunteerId: string)
  verify(verificationCode: string): Promise<boolean>;
}
