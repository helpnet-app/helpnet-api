import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ProgramSchema,
    ProgramService,
} from 'src/api/services/program.service';
import { CompanyModule } from '../company/company.module';
import { ProgramController } from './program.controller';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature([{ name: 'Program', schema: ProgramSchema }]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
