import { IsNotEmpty } from 'class-validator';

export class RemoveProductToCartDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  productId: number;
}
