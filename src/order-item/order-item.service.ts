import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from './order-item.repository';
import { OrderItemDto } from './dto/order-item.dto';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async createOrderItemService(dataDto: OrderItemDto[]) {
    const data = dataDto.map((item) => {
      return {
        quantity: item.quantity,
        currentProductPrice: item.currentProductPrice,
        order: {
          id: item.orderId,
        },
        product: {
          id: item.productId,
        },
      };
    }) as OrderItemEntity[];

    return await this.orderItemRepository.insertOrderItemRepository(data);
  }
}
