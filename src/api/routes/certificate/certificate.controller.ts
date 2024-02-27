import { Body, Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
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
  @Header('Content-Type', 'application/pdf')
  async generateCertificate(
    @Param('programId') programId: string,
    @Param('volunteerId') volunteerId: string,
  ) {
    const generateUC = new Generate(this.service);
    const file = await generateUC.execute(programId, volunteerId);
    const fileBuffer = Buffer.from(file);
    return new StreamableFile(fileBuffer);

  }
}
