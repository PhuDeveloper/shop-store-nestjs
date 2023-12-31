import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GetDetailProductDto } from './dto/get-detail-product.dto';
import { GetListProductDto } from './dto/get-list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductEntityResponseData, ProductListResponseData } from './type/response-product';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async createRepository(queryCreate: ProductEntity): Promise<ProductEntityResponseData> {
    try {
      const product = await this.save(queryCreate);

      if (!product) {
        throw new HttpException('Create product error', StatusResponse.SERVER_ERROR);
      }

      const response: ProductEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...product,
        },
      };

      return response;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Product code duplicate', StatusResponse.NOT_FOUND);
      }
      throw error;
    }
  }

  async updateRepository(queryUpdate: UpdateProductDto): Promise<ProductEntityResponseData> {
    try {
      const query = this.createQueryBuilder('product');
      const productId = queryUpdate.productId;
      await query.update().set(queryUpdate.data).where('id = :productId', { productId }).execute();

      const product = await this.getByIdRepository({ productId: productId });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getListRepository(querySearch: GetListProductDto): Promise<ProductListResponseData> {
    try {
      const { productId, brandId, productName, isDeleted, categoryId, productStart, productStatus, productCode } =
        querySearch;
      const page = querySearch.page ? Number(querySearch.page) : 1;
      const limit = querySearch.limit ? Number(querySearch.limit) : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brands')
        .take(limit)
        .skip(skip);

      if (productId) {
        query.andWhere('id= :productId', { productId });
      }

      if (brandId) {
        query.andWhere('brand_id = :brandId', { brandId });
      }

      if (categoryId) {
        query.andWhere('category_id = :categoryId', { categoryId });
      }

      if (productStart) {
        query.andWhere('product_start = :productStart', { productStart });
      }

      if (productStatus) {
        query.andWhere('product_status = :productStatus', { productStatus });
      }

      if (productName) {
        query.andWhere('product_name = :productName', { productName });
      }

      if (productCode) {
        query.andWhere('product_code = :productCode', { productCode });
      }

      if (isDeleted) {
        query.andWhere('is_deleted = :isDeleted', { isDeleted });
      }

      const [product, total] = await query.getManyAndCount();

      const response: ProductListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          product_list: product,
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

  async getByIdRepository(queryGetById: GetDetailProductDto): Promise<ProductEntityResponseData> {
    try {
      const { productId } = queryGetById;
      const query = this.createQueryBuilder('product')
        .leftJoinAndSelect('product.brand', 'brands')
        .leftJoinAndSelect('product.category', 'category');

      if (productId) {
        query.andWhere('product.id = :productId', { productId });
      }
      const product = await query.getOne();

      if (!product) {
        throw new NotFoundException('Sản phẩm không tồn tại');
      }

      const response: ProductEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...product,
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
