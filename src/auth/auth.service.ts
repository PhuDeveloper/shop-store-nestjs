import { UsersService } from '@/users/users.service';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { GetDetailUserDto } from '@/users/dto/get-detail-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenResponseData } from './dto/type/response-auth';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signInService(querySignIn: AuthSignInDto): Promise<AuthTokenResponseData> {
    const dataSignIn: GetDetailUserDto = {
      email: querySignIn.email,
    };

    const user = await this.usersService.getUserByEmailService(dataSignIn);

    if (user.payload?.password !== querySignIn.password) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.payload.email, fullName: user.payload.fullName, role: user.payload.role.id };

    const token = await this.jwtService.signAsync(payload);
    const response: AuthTokenResponseData = {
      message: 'Success',
      statusCode: HttpStatus.OK,
      payload: {
        accessToken: token,
      },
    };
    return response;
  }
}
