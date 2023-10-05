import { IsNotEmpty } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  productId: number[];
}
