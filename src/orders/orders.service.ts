import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersEntity } from './orders.entity';
import { OrderItemRepository } from '@/order-item/order-item.repository';
import { OrderItemEntity } from '@/order-item/order-item.entity';
import { GetListOrderDto } from './dto/get-list-order.dto';
import { GetDetailOrderDto } from './dto/get-detail-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository, private orderItemRepository: OrderItemRepository) {}

  async createOrderService(dataDto: CreateOrderDto) {
    const timestamp = Math.round(Date.now() / 1000);
    const dataTmp = {
      created: timestamp,
      updated: timestamp,
      user: {
        id: dataDto.userId,
      },
    } as OrdersEntity;

    const orderTmp = await this.ordersRepository.createOrderRepository(dataTmp);

    if (!orderTmp.payload?.id) {
      throw new NotFoundException('Order not found');
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
        id: dataDto.userId,
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
