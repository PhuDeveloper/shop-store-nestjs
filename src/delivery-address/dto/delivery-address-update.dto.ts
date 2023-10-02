import { IsNotEmpty } from 'class-validator';

export interface DeliveryAddressUpdateData {
  phone?: string;
  address?: string;
  name?: string;
  isDefault: number;
}

export class DeliveryAddressUpdateDto {
  @IsNotEmpty()
  deliveryAddressId: number;

  data: DeliveryAddressUpdateData;
}
