import { BrandEntity } from '@/brand/brand.entity';
import { CategoryEntity } from '@/category/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'int', default: 1, comment: 'Trạng thái sản phẩm (Còn hàng - hết hàng)' })
  productStatus: number;

  @Column({ type: 'float', comment: 'Giá gốc sản phẩm' })
  productPriceOrg: number;

  @Column({ type: 'float', comment: 'Giá giảm sản phẩm' })
  productPriceDiscount: number;

  @Column({ type: 'int', comment: 'Số sao đánh giá' })
  productStart: number;

  @Column({ type: 'text', comment: 'Mô tả sản phẩm', nullable: true })
  productDescription: string;

  @Column({ type: 'varchar', comment: 'Mã sản phẩm', unique: true })
  productCode: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  productCreated: number;

  @Column({ type: 'int', comment: 'Thời gian cập nhật' })
  productUpdated: number;

  @Column({ type: 'boolean', default: false, comment: 'Xóa sản phẩm' })
  isDeleted: boolean;

  @ManyToOne(() => BrandEntity, (brand) => brand.product)
  @JoinColumn()
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn()
  category: CategoryEntity;

  @Column({ type: 'json', comment: 'Danh sách hình ảnh' })
  imageUrlList: string[];

  @Column({ type: 'varchar' })
  imageUrl: string;
}
