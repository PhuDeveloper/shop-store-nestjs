import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetListOrderDto } from './dto/get-list-order.dto';
import { GetDetailOrderDto } from './dto/get-detail-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post('/create')
  async createOrderController(@Body() data: CreateOrderDto) {
    return await this.service.createOrderService(data);
  }

  @Post('/update')
  async updateOrderController(@Body() data: UpdateOrderDto) {
    return await this.service.updateOrderService(data);
  }

  @Get('/list')
  async getListController(@Query() data: GetListOrderDto) {
    return await this.service.getListService(data);
  }

  @Get('/:orderId')
  async getDetailController(@Param() data: GetDetailOrderDto) {
    return await this.service.getDetailService(data);
  }
}
