import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { GetDetailProductDto } from './dto/get-detail-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListResponse } from '@/types/product';
import { ProductListResponseData } from './type/response-product';

@Controller({ path: 'product' })
export class ProductController {
  constructor(private service: ProductService) {}

  @Post('/create')
  async createController(@Body() queryCreate: CreateProductDto) {
    return await this.service.createService(queryCreate);
  }

  @Get('/list')
  async getListController(@Query() querySearch: GetListProductDto): Promise<ProductListResponseData> {
    return await this.service.getListService(querySearch);
  }

  @Get('/:productId')
  async getDetailController(@Param() queryGetById: GetDetailProductDto) {
    return await this.service.getByIdService(queryGetById);
  }

  @Post('/update')
  async updateController(@Body() queryUpdate: UpdateProductDto) {
    console.log('úpd', queryUpdate);
    return await this.service.updateService(queryUpdate);
  }
}
