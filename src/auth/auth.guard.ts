import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PermissionList } from './auth.decorator';
import { RolesService } from '@/roles/roles.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private rolesService: RolesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get(PermissionList, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const infoUser: {
      email: string;
      name: string;
      role: number;
    } = await this.jwtService.verifyAsync(token, {
      secret: 'my-secret-key',
    });

    const roleInfo = await this.rolesService.getRoleByIdService({ id: infoUser.role });

    if (!infoUser) return false;

    const result = roleInfo.payload?.permission.map((item) => item.permission_code).includes(permission.toString());

    if (!result) return false;

    return result;
  }

  private extractTokenFromHeader(request: any): string | null {
    const token = request.headers.token;
    return token;
  }
  // private hasPermission(permissionCode: string): boolean {
  //   // Implement your authorization logic here
  //   // You can check user roles or permissions and return true if the user has the required permission
  //   // Otherwise, return false
  //   return permissionCode.includes('admin'); // Example: Check if user has 'admin' role
  // }
}
