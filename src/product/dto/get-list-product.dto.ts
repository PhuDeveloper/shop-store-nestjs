import { IsInt, IsOptional } from 'class-validator';

export class GetListProductDto {
  @IsOptional()
  productId: number;

  @IsOptional()
  productName: string;

  @IsOptional()
  brandId: number;

  @IsOptional()
  isDeleted: boolean;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
