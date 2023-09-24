import { IsNotEmpty, IsNumber } from 'class-validator';

export interface DataUpdateProduct {
  productName?: string;
  brandId?: number;
  productPriceOrg?: number;
  productStart?: number;
  productCreated?: number;
  productUpdated?: number;
  productPriceDiscount?: number;
  isDeleted?: boolean;
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
