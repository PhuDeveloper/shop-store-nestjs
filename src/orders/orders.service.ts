import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersEntity } from './orders.entity';
import { OrderItemRepository } from '@/order-item/order-item.repository';
import { OrderItemEntity } from '@/order-item/order-item.entity';
import { GetListOrderDto } from './dto/get-list-order.dto';
import { GetDetailOrderDto } from './dto/get-detail-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemRepository: OrderItemRepository,
    private jwtService: JwtService,
  ) {}

  async createOrderService(dataDto: CreateOrderDto, token: string) {
    const timestamp = Math.round(Date.now() / 1000);

    const infoUser: {
      email: string;
      name: string;
      role: number;
      userId: number;
    } = await this.jwtService.verifyAsync(token, {
      secret: 'my-secret-key',
    });

    const dataTmp = {
      created: timestamp,
      updated: timestamp,
      user: {
        id: infoUser.userId,
      },
    } as OrdersEntity;

    const orderTmp = await this.ordersRepository.createOrderRepository(dataTmp);

    if (!orderTmp.payload?.id) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    const dataOrderItemEntity = dataDto.orderItem.map((item) => {
      return {
        currentProductPrice: item.currentProductPrice,
        order: {
          id: orderTmp.payload?.id,
        },
        quantity: item.quantity,
        product: {
          id: item.productId,
        },
      };
    }) as OrderItemEntity[];

    await this.orderItemRepository.insertOrderItemRepository(dataOrderItemEntity);

    const listOrderItem = await this.orderItemRepository.getListOrderItemByOrderId(orderTmp.payload?.id);

    const data = {
      created: timestamp,
      updated: timestamp,
      user: {
        id: infoUser.userId,
      },
      orderItem: listOrderItem,
      id: orderTmp.payload?.id,
    } as OrdersEntity;

    const response = await this.ordersRepository.createOrderRepository(data);
    return response;
  }

  async getListService(data: GetListOrderDto) {
    return await this.ordersRepository.getListOrderRepository(data);
  }

  async getDetailService(data: GetDetailOrderDto) {
    return await this.ordersRepository.getDetailOrderByIdRepository(data);
  }

  async updateOrderService(dataUpdate: UpdateOrderDto) {
    const timestamp = Math.round(Date.now() / 1000);
    dataUpdate.data.updated = timestamp;

    return await this.ordersRepository.updateOrderRepository(dataUpdate);
  }
}
