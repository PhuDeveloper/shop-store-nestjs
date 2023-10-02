import { IsNotEmpty } from 'class-validator';

export class DeliveryAddressGetDetailDto {
  @IsNotEmpty()
  deliveryId;
}
