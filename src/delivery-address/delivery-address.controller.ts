import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressCreateDto } from './dto/delivery-address-create.dto';
import { DeliveryAddressGetListDto } from './dto/delivery-address-get-list';
import { DeliveryAddressUpdateDto } from './dto/delivery-address-update.dto';
import { DeliveryAddressGetDetailDto } from './dto/delivery-address-get-detail.dto';

@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(private service: DeliveryAddressService) {}

  @Get('/list')
  async getListController(@Query() querySearch: DeliveryAddressGetListDto) {
    return await this.service.getListService(querySearch);
  }

  @Post('/create')
  async createController(@Body() queryCreate: DeliveryAddressCreateDto) {
    return await this.service.createService(queryCreate);
  }

  @Get('/:deliveryId')
  async getDetailController(@Param() deliveryId: DeliveryAddressGetDetailDto) {
    return await this.service.getByIdService(deliveryId);
  }

  @Post('/update')
  async updateController(@Body() queryUpdate: DeliveryAddressUpdateDto) {
    return await this.service.updateService(queryUpdate);
  }
}
