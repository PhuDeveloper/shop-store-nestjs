import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemRepository extends Repository<OrderItemEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderItemEntity, dataSource.createEntityManager());
  }

  async insertOrderItemRepository(data: OrderItemEntity[]): Promise<InsertResult> {
    try {
      const orderItem = await this.insert(data);
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  async getListOrderItemByOrderId(orderId: number): Promise<OrderItemEntity[]> {
    const query = this.createQueryBuilder('order-item');
    if (orderId) {
      query.andWhere('order-item.order_id = :orderId', { orderId });
    }
    const orderItem = await query.getMany();

    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }

    return orderItem;
  }
}
