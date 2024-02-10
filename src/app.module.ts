import { Module } from '@nestjs/common';
import { ProgramController } from './api/routes/program/program.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './api/routes/company/company.module';
import { VolunteerModule } from './api/routes/volunteer/volunteer.module';

@Module({
  imports: [CompanyModule, VolunteerModule],
  controllers: [AppController, ProgramController],
  providers: [AppService],
})
export class AppModule {}
