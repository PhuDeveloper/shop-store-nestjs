import { OrderItemDto } from '@/order-item/dto/order-item.dto';
import { IsNotEmpty } from 'class-validator';

export interface OrderItem {
  quantity: number;
  productId: number;
  currentProductPrice: number;
  orderId: number;
}

// export interface DataProduct {

// }

export class CreateOrderDto {
  orderItem: OrderItem[];

  // product :
}
