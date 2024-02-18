import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApplicationSchema,
  ApplicationService,
} from 'src/api/services/application.service';
import {
  ProgramSchema,
  ProgramService,
} from 'src/api/services/program.service';
import { CompanyModule } from '../company/company.module';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { ProgramController } from './program.controller';

@Module({
  imports: [
    CompanyModule,
    VolunteerModule,
    MongooseModule.forFeature([{ name: 'Program', schema: ProgramSchema }]),
    MongooseModule.forFeature([
      { name: 'Application', schema: ApplicationSchema },
    ]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService, ApplicationService],
  exports: [ApplicationService, ProgramService],
})
export class ProgramModule {}
