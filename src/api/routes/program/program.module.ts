import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from 'src/api/schemas/application.schema';
import { ProgramSchema } from 'src/api/schemas/program.schema';
import { ApplicationService } from 'src/api/services/application.service';
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
  ],
  controllers: [ProgramController],
  providers: [ProgramService, ApplicationService],
  exports: [ApplicationService, ProgramService],
})
export class ProgramModule {}
