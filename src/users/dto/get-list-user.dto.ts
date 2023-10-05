import { IsOptional } from 'class-validator';

export class GetListUserDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  email: string;

  @IsOptional()
  roleId: number;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
