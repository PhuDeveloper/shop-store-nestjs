import { Reflector } from '@nestjs/core';

export const PermissionList = Reflector.createDecorator<string[]>();
