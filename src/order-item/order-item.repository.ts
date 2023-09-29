import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { ApiResponse } from '@/types/response';
import { StatusResponse } from '@/types/status';

@Injectable()
export class OrderItemRepository extends Repository<OrderItemEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderItemEntity, dataSource.createEntityManager());
  }

  async createOrderItemRepository(data: OrderItemEntity): Promise<ApiResponse<OrderItemEntity>> {
    try {
      const orderItem = await this.save(data);

      if (!orderItem) {
        throw new HttpException('Create order item error', StatusResponse.SERVER_ERROR);
      }

      const response: ApiResponse<OrderItemEntity> = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...orderItem,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
