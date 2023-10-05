import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BrandEntity } from './brand.entity';
import { GetDetailBrandDto } from './dto/get-detail-brand.dto';
import { GetListBrandDto } from './dto/get-list-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntityResponseData, BrandListResponseData } from './type/response-brand';

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private dataSource: DataSource) {
    super(BrandEntity, dataSource.createEntityManager());
  }
  async getListRepository(querySearch: GetListBrandDto): Promise<BrandListResponseData> {
    try {
      const { brandCode, brandId, brandName, isDeleted } = querySearch;
      const page = querySearch.page ? Number(querySearch.page) : 1;
      const limit = querySearch.limit ? Number(querySearch.limit) : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('brands').take(limit).skip(skip);

      if (brandCode) {
        query.andWhere('brand_code= :brandCode', { brandCode });
      }

      if (brandId) {
        query.andWhere('id = :brandId', { brandId });
      }

      if (brandName) {
        query.andWhere('brand_name = :brandName', { brandName });
      }

      if (isDeleted) {
        query.andWhere('is_deleted = :isDeleted', { isDeleted });
      }

      const [brands, total] = await query.getManyAndCount();

      const response: BrandListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          brand_list: brands,
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

  async getByIdRepository(queryGetById: GetDetailBrandDto): Promise<BrandEntityResponseData> {
    try {
      const { brandId } = queryGetById;
      const query = this.createQueryBuilder('brands');
      if (brandId) {
        query.andWhere('id = :brandId', { brandId });
      }
      const brand = await query.getOne();

      if (!brand) {
        throw new NotFoundException('Thương hiệu không tồn tại');
      }

      const response: BrandEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...brand,
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createRepository(queryCreate: BrandEntity): Promise<BrandEntityResponseData> {
    try {
      const brand = await this.save(queryCreate);

      if (!brand) {
        throw new HttpException('Create brand error', StatusResponse.SERVER_ERROR);
      }

      const response: BrandEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...brand,
        },
      };
      return response;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Brand code duplicate', StatusResponse.NOT_FOUND);
      }
      throw error;
    }
  }

  async updateRepository(queryUpdate: UpdateBrandDto): Promise<BrandEntityResponseData> {
    try {
      const query = this.createQueryBuilder('brands');
      const brandId = queryUpdate.brandId;
      await query.update().set(queryUpdate.data).where('id = :brandId', { brandId }).execute();

      const brand = await this.getByIdRepository({ brandId: brandId });
      return brand;
    } catch (error) {
      throw error;
    }
  }
}
