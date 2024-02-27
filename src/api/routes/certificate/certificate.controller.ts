import { Controller, Get } from '@nestjs/common';
import { PDFManagerService } from 'src/api/services/pdf_manager.service.';

@Controller('/certificate')
export class CertificateController {
  constructor() {}

  @Get('/generate')
  async execute() 
  {
    const service = new PDFManagerService(); 
    return service.generateCertificate();
  }
}
