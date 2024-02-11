import { Module } from '@nestjs/common';
import { ProgramController } from './api/routes/program/program.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './api/routes/company/company.module';
import { VolunteerModule } from './api/routes/volunteer/volunteer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CompanyModule, VolunteerModule, MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [AppController, ProgramController],
  providers: [AppService],
})
export class AppModule {}
