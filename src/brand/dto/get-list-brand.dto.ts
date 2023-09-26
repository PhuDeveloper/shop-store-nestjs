import { IsInt, IsOptional } from 'class-validator';

export class GetListBrandDto {
  @IsOptional()
  brandId: number;

  @IsOptional()
  brandCode: string;

  @IsOptional()
  brandName: string;

  @IsOptional()
  isDeleted: number;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
