import { OrdersEntity } from '@/orders/orders.entity';
import { ProductEntity } from '@/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrdersEntity, (order) => order)
  order: OrdersEntity;

  @Column({ type: 'int', comment: 'Số lượng sản phẩm' })
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product)
  product: ProductEntity;

  @Column({ type: 'float', comment: 'Giá sản phẩm tại thời điểm mua' })
  currentProductPrice: number;
}
