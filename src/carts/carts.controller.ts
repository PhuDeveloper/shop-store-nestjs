import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { RemoveProductToCartDto } from './dto/remove-product-to-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private service: CartsService) {}

  @Post('/add-product')
  async addProductToCartController(@Body() data: AddProductToCartDto) {
    return await this.service.addProductToCartService(data);
  }

  @Post('/remove-product')
  async removeProductToCartController(@Body() data: RemoveProductToCartDto) {
    return await this.service.removeProductToCartService(data);
  }
}
