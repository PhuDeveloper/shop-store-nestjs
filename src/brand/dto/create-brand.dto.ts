import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsOptional()
  brandCreated?: number;

  @IsNotEmpty()
  brandName: string;

  @IsNotEmpty()
  brandCode: string;

  @IsOptional()
  brandUpdated?: number;

  @IsOptional()
  isDeleted: number = 0; // Mặc định là chưa xóa

  @IsOptional()
  brandDescription?: string;
}
