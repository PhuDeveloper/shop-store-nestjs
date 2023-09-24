import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandEntity } from './brand/brand.entity';

import { ProductEntity } from './product/product.entity';

import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { JwtModule } from '@nestjs/jwt';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123123',
      database: 'shop_store',
      entities: [BrandEntity, ProductEntity, CategoryEntity],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    BrandModule,
    CategoryModule,
    ProductModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
