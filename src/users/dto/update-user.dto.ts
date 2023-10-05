import { IsNotEmpty } from 'class-validator';

export interface DataUpdateUser {
  name?: string;
  phone?: string;
  address?: string;
  roleId?: number;
  updated?: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  userId: number;

  data: DataUpdateUser;
}
