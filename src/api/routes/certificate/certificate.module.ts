import { Module } from '@nestjs/common';
import { PDFManagerService } from 'src/api/services/pdf_manager.service.';
import { CertificateController } from './certificate.controller';

@Module({
  imports: [],
  controllers: [CertificateController],
  providers: [PDFManagerService],
  exports: [PDFManagerService]
})
export class CertificateModule {}