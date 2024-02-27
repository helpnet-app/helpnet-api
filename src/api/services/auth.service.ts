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
  async login(username: string, password: string) {
    const organizationUser = await this.organizationService.findOne(
      'username',
      username,
    );
    const volunteerUser = await this.volunteerService.findOne(
      'username',
      username,
    );
    let user: any, role: any;
    if (organizationUser) {
      user = organizationUser;
      role = 'organization';
    } else if (volunteerUser) {
      user = volunteerUser;
      role = 'volunteer';
    } else {
      throw new UnauthorizedException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.email };
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
      role: role,
    };
  }
}
