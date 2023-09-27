import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signInController(@Body() signInRequest: AuthSignInDto) {
    return this.authService.signInService(signInRequest);
  }

  @Post('/register')
  registerController(@Body() registerRequest: CreateUserDto) {
    return this.usersService.createUserService(registerRequest);
  }
}
