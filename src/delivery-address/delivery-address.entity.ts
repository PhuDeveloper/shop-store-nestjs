import { OrdersEntity } from '@/orders/orders.entity';
import { UsersEntity } from '@/users/users.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery-address')
export class DeliveryAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.deliveryAddress)
  user: UsersEntity;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  isDefault: number;

  @OneToMany(() => OrdersEntity, (order) => order.deliveryAddress)
  order: OrdersEntity[];
}
