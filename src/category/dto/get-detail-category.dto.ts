import { IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class GetDetailCategoryDto {
  @IsNotEmpty()
  categoryId: number;
}
