import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export interface DataUpdateCategory {
  categoryName?: string;
  categoryUpdated?: number;
  isDeleted?: number;
  categoryDescription?: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  data: DataUpdateCategory;
}
