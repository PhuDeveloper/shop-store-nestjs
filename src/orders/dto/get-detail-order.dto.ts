import { IsOptional } from 'class-validator';

export class GetDetailOrderDto {
  @IsOptional()
  orderId: number;
}
