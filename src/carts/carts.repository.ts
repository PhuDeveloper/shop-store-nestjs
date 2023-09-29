import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CartsEntity } from './carts.entity';
import { CartEntityResponseData } from './type/response-cart';
import { StatusResponse } from '@/types/status';
import { GetCartDetailDto } from './dto/get-cart-detail.dto';
import { ApiResponse } from '@/types/response';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsRepository extends Repository<CartsEntity> {
  constructor(private dataSource: DataSource) {
    super(CartsEntity, dataSource.createEntityManager());
  }

  async updateProductToCartRepository(queryAddProduct: CartsEntity): Promise<CartEntityResponseData> {
    try {
      const cart = await this.save(queryAddProduct);

      if (!cart) {
        throw new HttpException('Update cart error', StatusResponse.SERVER_ERROR);
      }

      const response: CartEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...cart,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCartByIdRepository(data: GetCartDetailDto): Promise<CartEntityResponseData> {
    const { id, userId } = data;

    const query = this.createQueryBuilder('carts');

    if (id) {
      query.andWhere('carts.id = :id', { id });
    }

    if (userId) {
      query.andWhere('carts.user_id = :userId', { userId });
    }

    const cart = await query
      .leftJoinAndSelect('carts.product', 'product')
      .leftJoinAndSelect('carts.user', 'user')
      .getOne();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const response: CartEntityResponseData = {
      message: 'Success',
      statusCode: HttpStatus.OK,
      payload: {
        ...cart,
      },
    };

    return response;
  }

  async createCartRepository(data: CartsEntity): Promise<CartEntityResponseData> {
    try {
      const cart = await this.save(data);

      if (!cart) {
        throw new HttpException('Create cart error', StatusResponse.SERVER_ERROR);
      }

      const response: CartEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...cart,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
