import { BrandRepository } from '@/brand/brand.repository';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService, ProductRepository, BrandRepository, JwtService, RolesService, RolesRepository],
  controllers: [ProductController],
})
export class ProductModule {}
