import { IsInt, IsOptional } from 'class-validator';

export class GetListProductDto {
  @IsOptional()
  productId: number;

  @IsOptional()
  productName: string;

  @IsOptional()
  productStart: number;

  @IsOptional()
  productStatus: number;

  @IsOptional()
  brandId: number;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  isDeleted: boolean;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
