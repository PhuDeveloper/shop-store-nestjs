import { CategoryListResponse } from '@/types/category';
import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { GetDetailCategoryDto } from './dto/get-detail-category.dto';
import { GetListCategoryDto } from './dto/get-list-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntityResponseData, CategoryListResponseData } from './type/response-category';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }
  async getListRepository(querySearch: GetListCategoryDto): Promise<CategoryListResponseData> {
    try {
      const { categoryId, categoryName, isDeleted } = querySearch;
      const page = querySearch.page ? querySearch.page : 1;
      const limit = querySearch.limit ? querySearch.limit : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('category').take(limit).skip(skip);

      if (categoryId) {
        query.andWhere('id = :categoryId', { categoryId });
      }

      if (categoryName) {
        query.andWhere('category_name = :categoryName', { categoryName });
      }

      if (isDeleted) {
        query.andWhere('is_deleted = :isDeleted', { isDeleted });
      }

      const [category, total] = await query.getManyAndCount();

      const response: CategoryListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          category_list: category,
          limit,
          page,
          total,
        },
      };

      return response;
    } catch (error) {
      throw new HttpException('Internal server error', StatusResponse.SERVER_ERROR);
    }
  }

  async getByIdRepository(queryGetById: GetDetailCategoryDto): Promise<CategoryEntityResponseData> {
    try {
      const { categoryId } = queryGetById;
      const query = this.createQueryBuilder('category');
      if (categoryId) {
        query.andWhere('id = :categoryId', { categoryId });
      }
      const category = await query.getOne();

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const response: CategoryEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...category,
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createRepository(queryCreate: CategoryEntity): Promise<CategoryEntityResponseData> {
    try {
      const category = await this.save(queryCreate);

      if (!category) {
        throw new HttpException('Create category error', StatusResponse.SERVER_ERROR);
      }

      const response: CategoryEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...category,
        },
      };
      return response;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Category code duplicate', StatusResponse.NOT_FOUND);
      }
      throw error;
    }
  }

  async updateRepository(queryUpdate: UpdateCategoryDto): Promise<CategoryEntityResponseData> {
    try {
      const query = this.createQueryBuilder('category');
      const categoryId = queryUpdate.categoryId;
      await query.update().set(queryUpdate.data).where('id = :categoryId', { categoryId }).execute();

      const category = await this.getByIdRepository({ categoryId: categoryId });
      return category;
    } catch (error) {
      throw error;
    }
  }
}
