import { IsNotEmpty } from 'class-validator';

export interface DataUpdateOrder {
  status: number;
  updated?: number;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  orderId: number;

  data: DataUpdateOrder;
}
