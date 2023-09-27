import { DataSource, Repository } from 'typeorm';
import { RolesEntity } from './roles.entity';
import { GetRolesDto } from './dto/get-roles.dto';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '@/types/response';

@Injectable()
export class RolesRepository extends Repository<RolesEntity> {
  constructor(private dataSource: DataSource) {
    super(RolesEntity, dataSource.createEntityManager());
  }

  async getRoleBYIdRepository(queryGetRole: GetRolesDto): Promise<ApiResponse<RolesEntity>> {
    const { id } = queryGetRole;

    const query = this.createQueryBuilder('roles');

    if (id) {
      query.andWhere('roles.id = :id', { id });
    }

    const role = await query.leftJoinAndSelect('roles.permission', 'permission').getOne();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const response: ApiResponse<RolesEntity> = {
      message: 'Success',
      statusCode: HttpStatus.OK,
      payload: {
        ...role,
      },
    };
    return response;
  }
}
