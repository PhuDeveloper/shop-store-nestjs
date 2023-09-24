import { IsInt, IsOptional } from 'class-validator';

export class GetListBrandDto {
  @IsOptional()
  brandId: number;

  @IsOptional()
  brandCode: string;

  @IsOptional()
  brandName: string;

  @IsOptional()
  isDeleted: boolean;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
