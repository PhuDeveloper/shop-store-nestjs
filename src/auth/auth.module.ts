import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repository';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesService, RolesRepository],
})
export class AuthModule {}
