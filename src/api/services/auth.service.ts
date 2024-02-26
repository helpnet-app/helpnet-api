import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from './organization.service';
import { VolunteerService } from './volunteer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly volunteerService: VolunteerService,
    private jwtService: JwtService,
  ) {}
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await Promise.any([
      this.organizationService.findOne('email', email),
      this.volunteerService.findOne('email', email),
    ]);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
