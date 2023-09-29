import { IsNotEmpty } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number[];
}
