import { IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  currentProductPrice: number;

  @IsNotEmpty()
  orderId: number;
}
