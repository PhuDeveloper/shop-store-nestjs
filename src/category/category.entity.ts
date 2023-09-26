import { ProductEntity } from '@/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, Index } from 'typeorm';

export const UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: 'Tên danh mục' })
  categoryName: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  categoryCreated: number;

  @Column({ type: 'int', comment: 'Thời gian cập nhật' })
  categoryUpdated: number;

  @Column({ type: 'int', default: 0, comment: 'Xóa danh mục' })
  isDeleted: number;

  @Column({ type: 'text', comment: 'Mô tả danh mục' })
  categoryDescription?: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity[];
}
