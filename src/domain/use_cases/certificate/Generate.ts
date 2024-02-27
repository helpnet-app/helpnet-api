import { CertificateService } from 'src/api/services/certificate.service.';

export class Generate {
  constructor(private readonly service: CertificateService) {}
  async execute(programId: string, volunteerId: string) {
    return await this.service.generateCertificate(programId, volunteerId);
  }
}
