import { IsNotEmpty } from 'class-validator';

export class DeliveryAddressCreateDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isDefault: number;
}
