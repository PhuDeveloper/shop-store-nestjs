import { ProductEntity } from '@/product/product.entity';
import { UsersEntity } from '@/users/users.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
export class CartsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  product: ProductEntity[];
}
