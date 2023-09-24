import { Injectable } from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetDetailCategoryDto } from './dto/get-detail-category.dto';
import { GetListCategoryDto } from './dto/get-list-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntityResponseData, CategoryListResponseData } from './type/response-category';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getListService(querySearch: GetListCategoryDto): Promise<CategoryListResponseData> {
    return await this.categoryRepository.getListRepository(querySearch);
  }

  async createService(queryCreate: CreateCategoryDto): Promise<CategoryEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    const data = {
      categoryCreated: timestamp,
      categoryName: queryCreate.categoryName,
      categoryUpdated: timestamp,
      isDeleted: queryCreate.isDeleted,
      categoryDescription: queryCreate.categoryDescription,
    } as CategoryEntity;
    return await this.categoryRepository.createRepository(data);
  }

  async getByIdService(queryGetById: GetDetailCategoryDto): Promise<CategoryEntityResponseData> {
    return await this.categoryRepository.getByIdRepository(queryGetById);
  }

  async updateService(queryUpdate: UpdateCategoryDto): Promise<CategoryEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    await this.categoryRepository.getByIdRepository({ categoryId: queryUpdate.categoryId });

    queryUpdate.data.categoryUpdated = timestamp;

    return await this.categoryRepository.updateRepository(queryUpdate);
  }
}
