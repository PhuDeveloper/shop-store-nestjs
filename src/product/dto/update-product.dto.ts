import { BrandEntity } from '@/brand/brand.entity';
import { CategoryEntity } from '@/category/category.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface DataUpdateProduct {
  productName?: string;
  brand?: BrandEntity;
  category?: CategoryEntity;
  productPriceOrg?: number;
  productStart?: number;
  productCreated?: number;
  productUpdated?: number;
  productPriceDiscount?: number;
  isDeleted?: number;
  productDescription?: string;
  imageUrlList: string[];
  imageUrl: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  data: DataUpdateProduct;
}
