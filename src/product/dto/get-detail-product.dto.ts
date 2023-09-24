import { IsInt, IsNotEmpty } from 'class-validator';

export class GetDetailProductDto {
  @IsNotEmpty()
  productId: number;
}
