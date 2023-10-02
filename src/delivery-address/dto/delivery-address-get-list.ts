import { IsOptional } from 'class-validator';

export class DeliveryAddressGetListDto {
  @IsOptional()
  userId: number;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
