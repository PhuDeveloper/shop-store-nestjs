import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export interface DataUpdateBrand {
  brandName?: string;
  brandUpdated?: number;
  isDeleted?: boolean;
  brandDescription?: string;
}

export class UpdateBrandDto {
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  data: DataUpdateBrand;
}
