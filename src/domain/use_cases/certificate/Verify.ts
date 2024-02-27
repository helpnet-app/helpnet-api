import { CertificateService } from 'src/api/services/certificate.service.';

export class Verify {
  constructor(private readonly service: CertificateService) {}
  async execute(verificationCode: string) {
    return await this.service.verify(verificationCode);
  }
}
