import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { UserListResponseData, UsersEntityResponseData } from './type/response-users';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './users.entity';
import { CartsRepository } from '@/carts/carts.repository';
import { CartsEntity } from '@/carts/carts.entity';
import { GetListUserDto } from './dto/get-list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private cartsRepository: CartsRepository) {}

  async createUserService(queryCreate: CreateUserDto): Promise<UsersEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    const data = {
      fullName: queryCreate.fullName,
      address: queryCreate.address,
      email: queryCreate.email,
      phone: queryCreate.phone,
      created: timestamp,
      updated: timestamp,
      password: queryCreate.password,
      role: { id: queryCreate.roleId },
    } as UsersEntity;

    const user = await this.usersRepository.createUserRepository(data);

    const dataCreateCart = {
      user: {
        id: user.payload?.id,
      },
    } as CartsEntity;

    await this.cartsRepository.createCartRepository(dataCreateCart);

    return user;
  }

  async getUserByEmailOrIdService(queryGetDetail: GetDetailUserDto): Promise<UsersEntityResponseData> {
    return await this.usersRepository.getUserByEmailOrIdRepository(queryGetDetail);
  }

  async getListService(querySearch: GetListUserDto): Promise<UserListResponseData> {
    return await this.usersRepository.getListRepository(querySearch);
  }

  async updateService(queryUpdate: UpdateUserDto): Promise<UsersEntityResponseData> {
    const timestamp = Math.round(Date.now() / 1000);

    queryUpdate.data.updated = timestamp;

    return await this.usersRepository.updateRepository(queryUpdate);
  }
}
