import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionInterceptor } from './api/decorators/http_exception_interceptor';
import { AuthModule } from './api/routes/auth/auth.module';
// import { CertificateModule } from './api/routes/certificate/certificate.module';
import { CertificateModule } from './api/routes/certificate/certificate.module';
import { OrganizationModule } from './api/routes/organization/organization.module';
import { ProgramModule } from './api/routes/program/program.module';
import { VolunteerModule } from './api/routes/volunteer/volunteer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrganizationModule,
    VolunteerModule,
    ProgramModule,
    AuthModule,
    CertificateModule,
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
