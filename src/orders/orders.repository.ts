import { ApiResponse } from '@/types/response';
import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GetDetailOrderDto } from './dto/get-detail-order.dto';
import { OrdersEntity } from './orders.entity';
import { GetListOrderDto } from './dto/get-list-order.dto';
import { OrderListResponseData } from './type/response-orders';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  async getDetailOrderByIdRepository(data: GetDetailOrderDto): Promise<ApiResponse<OrdersEntity>> {
    const { orderId } = data;

    const query = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItem', 'order_item')
      .leftJoinAndSelect('orders.user', 'user')
      // .leftJoinAndSelect('user.deliveryAddress', 'delivery-address')
      .leftJoinAndSelect('order_item.product', 'product');

    if (orderId) {
      query.andWhere('orders.id = :orderId', { orderId });
    }

    const order = await query.getOne();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const response: ApiResponse<OrdersEntity> = {
      message: 'Success',
      statusCode: HttpStatus.OK,
      payload: {
        ...order,
      },
    };

    return response;
  }

  async getListOrderRepository(data: GetListOrderDto): Promise<OrderListResponseData> {
    try {
      const { status, userId } = data;
      const page = data.page ? Number(data.page) : 1;
      const limit = data.limit ? Number(data.limit) : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('orders')

        .take(limit)
        .skip(skip);

      if (status) {
        query.andWhere('status= :status', { status });
      }

      if (userId) {
        query.andWhere('user_id = :userId', { userId });
      }

      const [orders, total] = await query
        .leftJoinAndSelect('orders.orderItem', 'order_item')
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.deliveryAddress', 'delivery-address')
        .leftJoinAndSelect('order_item.product', 'product')
        .getManyAndCount();
      const response: OrderListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          order_list: orders,
          limit,
          page,
          total,
        },
      };

      return response;
    } catch (error) {
      throw new HttpException('Internal server error', StatusResponse.SERVER_ERROR);
    }
  }

  async updateOrderRepository(dataUpdate: UpdateOrderDto): Promise<ApiResponse<OrdersEntity>> {
    try {
      const query = await this.createQueryBuilder('orders');
      const orderId = dataUpdate.orderId;

      await query.update().set(dataUpdate.data).where('id =:orderId', { orderId }).execute();

      const order = await this.getDetailOrderByIdRepository({ orderId: orderId });

      return order;
    } catch (error) {
      throw error;
    }
  }
}
