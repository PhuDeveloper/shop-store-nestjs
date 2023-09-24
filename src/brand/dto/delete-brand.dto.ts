import { IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class DeleteBrandDto {
  @IsNotEmpty()
  @IsInt()
  brandId: number;
}
