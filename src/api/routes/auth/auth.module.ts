import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/api/services/auth.service';
import { OrganizationModule } from '../organization/organization.module';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    OrganizationModule,
    VolunteerModule,
    JwtModule.register({
      secret: 'secret-help',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
