import { IsInt, IsOptional } from 'class-validator';

export class GetListCategoryDto {
  @IsOptional()
  categoryId: number;

  @IsOptional()
  categoryName: string;

  @IsOptional()
  isDeleted: number;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
