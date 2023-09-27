import { PermissionEntity } from '@/permission/permission.entity';
import { UsersEntity } from '@/users/users.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  roleName: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  created: number;

  @Column({ type: 'int', comment: 'Thời gian cập' })
  updated: number;

  @OneToMany(() => UsersEntity, (user) => user.role)
  user: UsersEntity;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permission: PermissionEntity[];
}
