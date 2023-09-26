import { ProductEntity } from '@/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, Index } from 'typeorm';

export const UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';

@Entity('brands')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: 'Tên thương hiệu' })
  brandName: string;

  @Column({ type: 'varchar', comment: 'Mã thương hiệu', unique: true })
  brandCode: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  brandCreated: number;

  @Column({ type: 'int', comment: 'Thời gian cập nhật' })
  brandUpdated: number;

  @Column({ type: 'int', default: 0, comment: 'Xóa thương hiệu' })
  isDeleted: number;

  @Column({ type: 'text', comment: 'Mô tả thương hiệu' })
  brandDescription?: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  product: ProductEntity[];
}
