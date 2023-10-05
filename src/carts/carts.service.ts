import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { CartsEntity } from './carts.entity';
import { ProductEntity } from '@/product/product.entity';
import { UsersEntity } from '@/users/users.entity';
import { RemoveProductToCartDto } from './dto/remove-product-to-cart.dto';
import { JwtService } from '@nestjs/jwt';
import { GetCartDetailDto } from './dto/get-cart-detail.dto';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository, private jwtService: JwtService) {}

  async addProductToCartService(queryAddProduct: AddProductToCartDto, token: string) {
    const infoUser: {
      email: string;
      name: string;
      role: number;
      userId: number;
    } = await this.jwtService.verifyAsync(token, {
      secret: 'my-secret-key',
    });

    const product = queryAddProduct.productId.map((item) => {
      return {
        id: item,
      };
    }) as ProductEntity[];

    const cartOrg = await this.cartsRepository.getCartByIdRepository({ userId: infoUser.userId });

    const productOrgList = cartOrg.payload?.product.map((item) => {
      return {
        id: item.id,
      };
    }) as ProductEntity[];

    const user = {
      id: infoUser.userId,
    } as UsersEntity;

    const data = {
      product: productOrgList.concat(product),
      id: cartOrg.payload?.id,
      user: user,
    } as CartsEntity;

    return await this.cartsRepository.updateProductToCartRepository(data);
  }

  async removeProductToCartService(query: RemoveProductToCartDto) {
    const productOrg = await this.cartsRepository.getCartByIdRepository({ id: query.id });

    const productOrgList = productOrg.payload?.product.map((item) => {
      return {
        id: item.id,
      };
    }) as ProductEntity[];

    const data = {
      product: productOrgList.filter((item) => item.id !== query.productId),
      id: query.id,
    } as CartsEntity;

    return await this.cartsRepository.updateProductToCartRepository(data);
  }

  async getCartByUser(token: string) {
    const infoUser: {
      email: string;
      name: string;
      role: number;
      userId: number;
    } = await this.jwtService.verifyAsync(token, {
      secret: 'my-secret-key',
    });

    const query: GetCartDetailDto = {
      userId: infoUser.userId,
    };

    return this.cartsRepository.getCartByIdRepository(query);
  }
}
