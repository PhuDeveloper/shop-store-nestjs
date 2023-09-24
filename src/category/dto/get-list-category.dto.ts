import { IsInt, IsOptional } from 'class-validator';

export class GetListCategoryDto {
  @IsOptional()
  categoryId: number;

  @IsOptional()
  categoryName: string;

  @IsOptional()
  isDeleted: boolean;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
