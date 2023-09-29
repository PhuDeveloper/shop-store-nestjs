import { OrdersEntity } from '@/orders/orders.entity';
import { RolesEntity } from '@/roles/roles.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  created: number;

  @Column({ type: 'int', comment: 'Thời gian cập' })
  updated: number;

  @Column({ type: 'int', default: 0, comment: 'Xóa user' })
  isDeleted: number;

  @ManyToOne(() => RolesEntity, (role) => role.user)
  @JoinColumn()
  role: RolesEntity;

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];
}
