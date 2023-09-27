import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';

@Module({
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
