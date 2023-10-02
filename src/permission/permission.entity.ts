import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  permission_name: string;

  @Column({ type: 'varchar' })
  permission_code: string;

  @Column({ type: 'int', comment: 'Thời gian tạo' })
  created: number;

  @Column({ type: 'int', comment: 'Thời gian cập' })
  updated: number;

  // @ManyToMany(() => RolesEntity, (role) => role.permission)
  // roles: RolesEntity[];
}
