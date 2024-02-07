import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverDto } from './dto/recover.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('recover')
  recover(@Body() recoverDto:RecoverDto) {
    return this.authService.recover(recoverDto);
  }

  @Post('change')
  change(@Body() changePasswordDto:ChangePasswordDto) {
    return this.authService.change(changePasswordDto);
  }
}
