import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async createOrderItemService(dataDto: OrderItemDto) {
    const data = {
      order: {
        id: dataDto.orderId,
      },
      product: {
        id: dataDto.productId,
      },
      quantity: dataDto.quantity,
      currentProductPrice: dataDto.currentProductPrice,
    } as OrderItemEntity;

    return await this.orderItemRepository.createOrderItemRepository(data);
  }
}
