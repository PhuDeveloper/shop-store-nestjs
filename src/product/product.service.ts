import { BrandRepository } from '@/brand/brand.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetDetailProductDto } from './dto/get-detail-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductEntityResponseData, ProductListResponseData } from './type/response-product';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository, private brandRepository: BrandRepository) {}

  async createService(queryCreate: CreateProductDto): Promise<ProductEntityResponseData> {
    const brandId = queryCreate.brandId;
    const categoryId = queryCreate.categoryId;
    const timestamp = Math.round(Date.now() / 1000);

    const brand = await this.brandRepository.getByIdRepository({ brandId: brandId });

    if (!brand) {
      throw new HttpException('Brand not found ', HttpStatus.NOT_FOUND);
    }

    const data = {
      brand: {
        id: brandId,
      },
      category: {
        id: categoryId,
      },
      productCreated: timestamp,
      productUpdated: timestamp,
      isDeleted: queryCreate.isDeleted,
      productCode: queryCreate.productCode,
      productDescription: queryCreate.productDescription,
      productName: queryCreate.productName,
      productPriceDiscount: queryCreate.productPriceDiscount,
      productPriceOrg: queryCreate.productPriceOrg,
      productStart: queryCreate.productStart,
      productStatus: queryCreate.productStatus ?? 0,
      imageUrl: queryCreate.imageUrl,
      imageUrlList: queryCreate.imageUrlList,
    } as ProductEntity;

    const product = await this.productRepository.createRepository(data);

    return product;
  }

  async getListService(querySearch: GetListProductDto): Promise<ProductListResponseData> {
    return await this.productRepository.getListRepository(querySearch);
  }

  async getByIdService(queryGetById: GetDetailProductDto): Promise<ProductEntityResponseData> {
    return await this.productRepository.getByIdRepository(queryGetById);
  }

  async updateService(queryUpdate: UpdateProductDto): Promise<ProductEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    await this.productRepository.getByIdRepository({ productId: queryUpdate.productId });

    queryUpdate.data.productUpdated = timestamp;

    return await this.productRepository.updateRepository(queryUpdate);
  }
}
