import { PermissionList } from '@/auth/auth.decorator';
import { AuthGuard } from '@/auth/auth.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetDetailProductDto } from './dto/get-detail-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ProductListResponseData } from './type/response-product';

@Controller({ path: 'product' })
export class ProductController {
  constructor(private service: ProductService) {}
  @UseGuards(AuthGuard)
  @PermissionList(['PRODUCT_CREATE'])
  @Post('/create')
  async createController(@Body() queryCreate: CreateProductDto) {
    return await this.service.createService(queryCreate);
  }

  // @UseGuards(AuthGuard)
  // @PermissionList(['PRODUCT_SEARCH'])
  @Get('/list')
  async getListController(@Query() querySearch: GetListProductDto): Promise<ProductListResponseData> {
    return await this.service.getListService(querySearch);
  }

  // @UseGuards(AuthGuard)
  // @PermissionList(['PRODUCT_GET'])
  @Get('/:productId')
  async getDetailController(@Param() queryGetById: GetDetailProductDto) {
    return await this.service.getByIdService(queryGetById);
  }

  @UseGuards(AuthGuard)
  @PermissionList(['PRODUCT_UPDATE'])
  @Post('/update')
  async updateController(@Body() queryUpdate: UpdateProductDto) {
    return await this.service.updateService(queryUpdate);
  }
}
