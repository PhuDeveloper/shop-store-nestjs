import { IsOptional } from 'class-validator';

export class GetCartDetailDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  userId?: number;
}
