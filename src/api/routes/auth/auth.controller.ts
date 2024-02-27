import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/api/services/auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) 
  @Post() // OK
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.login(signInDto.username, signInDto.password);
  }
}