import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { GetRolesDto } from './dto/get-roles.dto';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async getRoleByIdService(queryGetRole: GetRolesDto) {
    return await this.rolesRepository.getRoleBYIdRepository(queryGetRole);
  }
}
