import { Module } from '@nestjs/common';
import { ProgramController } from './api/routes/program/program.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ProgramController],
  providers: [AppService],
})
export class AppModule {}
