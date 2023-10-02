import { DeliveryAddressEntity } from '@/delivery-address/delivery-address.entity';
import { OrderItemEntity } from '@/order-item/order-item.entity';
import { UsersEntity } from '@/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn()
  user: UsersEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItem: OrderItemEntity[];

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  created: number;

  @Column({ type: 'int', comment: 'Thời gian cập nhật' })
  updated: number;

  @Column({ type: 'int', comment: 'Trạng thái đơn hàng 1: Vừa tạo, 2: Đang giao, 3: Hoàn thành, 4: Hủy ', default: 1 })
  status: number;

  @ManyToOne(() => DeliveryAddressEntity, (delivery) => delivery.order)
  deliveryAddress: DeliveryAddressEntity;
}
