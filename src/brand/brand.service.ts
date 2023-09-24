import { Injectable } from '@nestjs/common';

import { BrandListResponse } from '@/types/brand';
import { BrandEntity } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetDetailBrandDto } from './dto/get-detail-brand.dto';
import { GetListBrandDto } from './dto/get-list-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandEntityResponseData, BrandListResponseData } from './type/response-brand';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) {}

  async getListService(querySearch: GetListBrandDto): Promise<BrandListResponseData> {
    return await this.brandRepository.getListRepository(querySearch);
  }

  async createService(queryCreate: CreateBrandDto): Promise<BrandEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    const data = {
      brandCode: queryCreate.brandCode,
      brandCreated: timestamp,
      brandName: queryCreate.brandName,
      brandUpdated: timestamp,
      isDeleted: queryCreate.isDeleted,
      brandDescription: queryCreate.brandDescription,
    } as BrandEntity;
    return await this.brandRepository.createRepository(data);
  }

  async getByIdService(queryGetById: GetDetailBrandDto): Promise<BrandEntityResponseData> {
    return await this.brandRepository.getByIdRepository(queryGetById);
  }

  async updateService(queryUpdate: UpdateBrandDto): Promise<BrandEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    await this.brandRepository.getByIdRepository({ brandId: queryUpdate.brandId });

    queryUpdate.data.brandUpdated = timestamp;

    return await this.brandRepository.updateRepository(queryUpdate);
  }
}
