import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetDetailBrandDto } from './dto/get-detail-brand.dto';
import { GetListBrandDto } from './dto/get-list-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntityResponseData, BrandListResponseData } from './type/response-brand';

@Controller({ path: 'brand' })
export class BrandController {
  constructor(private service: BrandService) {}
  // @UseGuards(AuthGuard)
  // @PermissionList(['BRAND_SEARCH'])
  @Get('/list')
  async getListController(@Query() querySearch: GetListBrandDto): Promise<BrandListResponseData> {
    console.log('vvvv', process.env.PASSWORD_DB);
    return await this.service.getListService(querySearch);
  }

  @Post('/create')
  async createController(@Body() queryCreate: CreateBrandDto): Promise<BrandEntityResponseData> {
    return await this.service.createService(queryCreate);
  }

  @Get('/:brandId')
  async getDetailController(@Param() queryGetById: GetDetailBrandDto): Promise<BrandEntityResponseData> {
    return await this.service.getByIdService(queryGetById);
  }

  @Post('/update')
  async updateController(@Body() queryUpdate: UpdateBrandDto): Promise<BrandEntityResponseData> {
    return await this.service.updateService(queryUpdate);
  }
}
