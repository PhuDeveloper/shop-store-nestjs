import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsOptional()
  brandId: number;

  @IsNotEmpty()
  productPriceOrg: number;

  @IsNotEmpty()
  productStart: number;

  @IsNotEmpty()
  productCode: string;

  @IsOptional()
  productCreated: number;

  @IsOptional()
  productUpdated?: number;

  @IsOptional()
  productPriceDiscount?: number;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean = false;

  @IsOptional()
  productStatus?: number = 0;

  @IsOptional()
  productDescription: string;

  @IsOptional()
  imageUrlList: string[];

  @IsOptional()
  imageUrl: string;
}
