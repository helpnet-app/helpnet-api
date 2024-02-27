import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from 'src/api/schemas/application.schema';
import { CertificateSchema } from 'src/api/schemas/certificate.schema';
import { ProgramSchema } from 'src/api/schemas/program.schema';
import { ApplicationService } from 'src/api/services/application.service';
import { CertificateService } from 'src/api/services/certificate.service.';
import { PDFManagerService } from 'src/api/services/pdf_mananger.service';
import { ProgramService } from 'src/api/services/program.service';
import { OrganizationModule } from '../organization/organization.module';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { ProgramController } from './program.controller';

@Module({
  imports: [
    OrganizationModule,
    VolunteerModule,
    MongooseModule.forFeature([{ name: 'Program', schema: ProgramSchema }]),
    MongooseModule.forFeature([
      { name: 'Application', schema: ApplicationSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Certificate', schema: CertificateSchema },
    ]),
  ],
  controllers: [ProgramController],
  providers: [
    ProgramService,
    ApplicationService,
    CertificateService,
    PDFManagerService,
  ],
  exports: [ApplicationService, ProgramService, CertificateService],
})
export class ProgramModule {}
