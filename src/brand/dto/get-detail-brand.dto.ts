import { IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class GetDetailBrandDto {
  @IsNotEmpty()
  brandId: number;
}
