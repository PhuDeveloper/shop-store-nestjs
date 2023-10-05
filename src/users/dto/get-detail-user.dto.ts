import { IsOptional } from 'class-validator';

export class GetDetailUserDto {
  @IsOptional()
  email?: string;

  @IsOptional()
  userId?: number;
}
