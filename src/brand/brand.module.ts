import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './brand.entity';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandRepository } from './brand.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    JwtModule.register({
      global: true,
      secret: 'Test',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [BrandService, BrandRepository],
  controllers: [BrandController],
})
export class BrandModule {}
