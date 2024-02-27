import { Body, Controller, Get, Param } from '@nestjs/common';
import { CertificateService } from 'src/api/services/certificate.service.';
import { VerificationRequest } from 'src/domain/entities/Cerfiticate';
import { Generate } from 'src/domain/use_cases/certificate/Generate';
import { Verify } from 'src/domain/use_cases/certificate/Verify';

@Controller('/certificate')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}

  @Get('verify')
  async execute(@Body() verification: VerificationRequest) {
    const verifyUC = new Verify(this.service);
    return await verifyUC.execute(verification.verificationCode);
  }
  @Get('/:programId/:volunteerId/generate')
  async generateCertificate(
    @Param('programId') programId: string,
    @Param('volunteerId') volunteerId: string,
  ) {
    const generateUC = new Generate(this.service);
    return generateUC.execute(programId, volunteerId);
  }
}
