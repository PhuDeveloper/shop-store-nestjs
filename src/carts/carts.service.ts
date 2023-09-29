import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { CartsEntity } from './carts.entity';
import { ProductEntity } from '@/product/product.entity';
import { UsersEntity } from '@/users/users.entity';
import { RemoveProductToCartDto } from './dto/remove-product-to-cart.dto';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository) {}

  async addProductToCartService(queryAddProduct: AddProductToCartDto) {
    const product = queryAddProduct.productId.map((item) => {
      return {
        id: item,
      };
    }) as ProductEntity[];

    const productOrg = await this.cartsRepository.getCartByIdRepository({ id: queryAddProduct.id });

    const productOrgList = productOrg.payload?.product.map((item) => {
      return {
        id: item.id,
      };
    }) as ProductEntity[];

    const user = {
      id: queryAddProduct.userId,
    } as UsersEntity;

    const data = {
      product: productOrgList.concat(product),
      id: queryAddProduct.id,
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
}
