import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemRepository } from './order-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],

  providers: [OrderItemService, OrderItemRepository],
  exports: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
