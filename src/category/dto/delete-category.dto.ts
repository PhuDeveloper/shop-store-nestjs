import { IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsInt()
  brandId: number;
}
