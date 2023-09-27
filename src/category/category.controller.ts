import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetDetailCategoryDto } from './dto/get-detail-category.dto';
import { GetListCategoryDto } from './dto/get-list-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntityResponseData, CategoryListResponseData } from './type/response-category';

@Controller({ path: 'category' })
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Get('/list')
  async getListController(@Query() querySearch: GetListCategoryDto): Promise<CategoryListResponseData> {
    return await this.service.getListService(querySearch);
  }

  @Post('/create')
  async createController(@Body() queryCreate: CreateCategoryDto): Promise<CategoryEntityResponseData> {
    return await this.service.createService(queryCreate);
  }

  @Get('/:categoryId')
  async getDetailController(@Param() queryGetById: GetDetailCategoryDto): Promise<CategoryEntityResponseData> {
    return await this.service.getByIdService(queryGetById);
  }

  @Post('/update')
  async updateController(@Body() queryUpdate: UpdateCategoryDto): Promise<CategoryEntityResponseData> {
    return await this.service.updateService(queryUpdate);
  }
}
