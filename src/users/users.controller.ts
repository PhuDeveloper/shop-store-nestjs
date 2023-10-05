import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { ApiResponse } from '@/types/response';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetListUserDto } from './dto/get-list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListResponseData } from './type/response-users';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/list')
  async getListController(@Query() querySearch: GetListUserDto): Promise<UserListResponseData> {
    return await this.service.getListService(querySearch);
  }

  @Get('/:userId')
  async getDetailController(@Param() queryGetById: GetDetailUserDto): Promise<ApiResponse<UsersEntity>> {
    return await this.service.getUserByEmailOrIdService(queryGetById);
  }

  @Post('/update')
  async updateController(@Body() queryUpdate: UpdateUserDto): Promise<ApiResponse<UsersEntity>> {
    return await this.service.updateService(queryUpdate);
  }
}
