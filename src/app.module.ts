import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandEntity } from './brand/brand.entity';

import { ProductEntity } from './product/product.entity';

import { JwtModule } from '@nestjs/jwt';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';
import { PermissionEntity } from './permission/permission.entity';
import { RolesEntity } from './roles/roles.entity';
import { CartsModule } from './carts/carts.module';
import { CartsEntity } from './carts/carts.entity';
import { OrdersModule } from './orders/orders.module';
import { OrdersEntity } from './orders/orders.entity';
import { OrderItemService } from './order-item/order-item.service';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItemEntity } from './order-item/order-item.entity';
import { DeliveryAddressEntity } from './delivery-address/delivery-address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123123',
      database: 'shop_store',
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    UploadModule,
    UsersModule,
    PermissionModule,
    RolesModule,
    CartsModule,
    OrdersModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrderItemService],
})
export class AppModule {}
