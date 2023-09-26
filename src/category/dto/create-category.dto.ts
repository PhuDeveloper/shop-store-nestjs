import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  categoryCreated?: number;

  @IsNotEmpty()
  categoryName: string;

  @IsOptional()
  categoryUpdated?: number;

  @IsOptional()
  isDeleted: number = 0; // Mặc định là chưa xóa

  @IsOptional()
  categoryDescription?: string;
}
