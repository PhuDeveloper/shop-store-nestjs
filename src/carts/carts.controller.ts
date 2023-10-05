import { Body, Controller, ExecutionContext, Get, Header, Headers, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { RemoveProductToCartDto } from './dto/remove-product-to-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private service: CartsService) {}

  @Post('/add-product')
  async addProductToCartController(@Body() data: AddProductToCartDto, @Headers() header) {
    const token = header.token;
    return await this.service.addProductToCartService(data, token);
  }

  @Post('/remove-product')
  async removeProductToCartController(@Body() data: RemoveProductToCartDto) {
    return await this.service.removeProductToCartService(data);
  }

  @Get('get-cart')
  async getCartByUser(@Headers() header) {
    const token = header.token;

    return await this.service.getCartByUser(token);
  }
}
