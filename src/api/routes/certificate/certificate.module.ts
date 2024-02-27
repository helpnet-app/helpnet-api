import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CertificateSchema } from 'src/api/schemas/certificate.schema';
import { CertificateService } from 'src/api/services/certificate.service.';
import { PDFManagerService } from 'src/api/services/pdf_mananger.service';
import { ProgramModule } from '../program/program.module';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { CertificateController } from './certificate.controller';

@Module({
  imports: [
    ProgramModule,
    VolunteerModule,
    MongooseModule.forFeature([
      { name: 'Certificate', schema: CertificateSchema },
    ]),
  ],
  controllers: [CertificateController],
  providers: [CertificateService, PDFManagerService],
  exports: [CertificateService, PDFManagerService],
})
export class CertificateModule {}
