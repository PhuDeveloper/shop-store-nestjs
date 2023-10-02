import { IsOptional } from 'class-validator';

export class GetListOrderDto {
  @IsOptional()
  userId: number;

  @IsOptional()
  status: number;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
