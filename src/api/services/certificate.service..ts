import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from 'src/domain/entities/Application';
import { Certificate } from 'src/domain/entities/Cerfiticate';
import { ItemNotFoundError } from 'src/domain/exceptions/item_not_found';
import { ICertificateService } from 'src/domain/ports/icertificate_service';
import { PDFManagerService } from './pdf_mananger.service';
import { ProgramService } from './program.service';
import { VolunteerService } from './volunteer.service';

export class CertificateService implements ICertificateService {
  constructor(
    @InjectModel('Certificate')
    private readonly certificateModel: Model<Certificate>,
    private readonly pdfManager: PDFManagerService,
    private readonly volunteerService: VolunteerService,
    private readonly programService: ProgramService,
  ) {}

  generateCode(): string {
    let outString: string = '';
    const inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(
        Math.floor(Math.random() * inOptions.length),
      );
    }
    return outString;
  }

  async createCertificatesFromUpdatedApplications(applications: Application[]) {
    const certificatesPromises = applications.map(async (application) => {
      const createdCertificate = await this.certificateModel.create({
        program: application.program,
        volunteer: application.volunteer,
        verificationCode: this.generateCode(),
      });
      return createdCertificate;
    });
    return await Promise.all(certificatesPromises);
  }

  async generateCertificate(programId: string, volunteerId: string) {
    const certificate = await this.certificateModel.findOne({
      program: programId,
      volunteer: volunteerId,
    });
    if (!certificate) {
      throw new ItemNotFoundError('Certificado não encontrado.');
    }
    const volunteer = await this.volunteerService.findById(volunteerId);
    const program = await this.programService.findById(programId);
    const newFile = await this.pdfManager.buildPDF(
      program,
      volunteer,
      certificate.verificationCode,
    );
    return {
      file: newFile,
    };
  }

  async verify(verificationCode: string): Promise<boolean> {
    const cerificate = await this.certificateModel.findOne({
      verificationCode: verificationCode,
    });
    if (cerificate) return true;
    else return false;
  }
}
