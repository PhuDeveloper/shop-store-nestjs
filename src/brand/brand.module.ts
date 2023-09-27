import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandEntity } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { BrandService } from './brand.service';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService, BrandRepository, JwtService, RolesService, RolesRepository],
  controllers: [BrandController],
})
export class BrandModule {}
