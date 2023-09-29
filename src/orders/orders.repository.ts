import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { ApiResponse } from '@/types/response';
import { StatusResponse } from '@/types/status';

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
  constructor(private dataSource: DataSource) {
    super(OrdersEntity, dataSource.createEntityManager());
  }

  async createOrderRepository(data: OrdersEntity): Promise<ApiResponse<OrdersEntity>> {
    try {
      const order = await this.save(data);

      if (!order) {
        throw new HttpException('Create order error', StatusResponse.SERVER_ERROR);
      }

      const response: ApiResponse<OrdersEntity> = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...order,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
