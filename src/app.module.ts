import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionInterceptor } from './api/decorators/http_exception_interceptor';
import { AuthModule } from './api/routes/auth/auth.module';
import { CompanyModule } from './api/routes/company/company.module';
import { ProgramModule } from './api/routes/program/program.module';
import { VolunteerModule } from './api/routes/volunteer/volunteer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CompanyModule,
    VolunteerModule,
    ProgramModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpExceptionInterceptor,
    },
  ],
})
export class AppModule {}
