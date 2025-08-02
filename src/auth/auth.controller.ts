import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerDto } from './dtos/auth.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  @Post('register')
  async register(@Body() userData: registerDto) {
    await this.AuthService.createUserService(userData);
    return { message: "User Created Successfully" };
  }

  @Post('login')
  async login(@Body() userData: loginDto) {
    return await this.AuthService.loginLogic(userData);;
  }
}
