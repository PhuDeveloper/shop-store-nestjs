import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export interface DataUpdateBrand {
  brandName?: string;
  brandUpdated?: number;
  isDeleted?: number;
  brandDescription?: string;
}

export class UpdateBrandDto {
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  data: DataUpdateBrand;
}
