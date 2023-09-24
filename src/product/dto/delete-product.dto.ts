import { IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;
}
