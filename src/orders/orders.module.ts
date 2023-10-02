import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrderItemRepository } from '@/order-item/order-item.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrderItemRepository],
})
export class OrdersModule {}
