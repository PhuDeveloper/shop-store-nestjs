import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { UsersEntityResponseData } from './type/response-users';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

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
    } as UsersEntity;

    return this.usersRepository.createUserRepository(data);
  }

  async getUserByEmailService(queryGetDetail: GetDetailUserDto): Promise<UsersEntityResponseData> {
    return await this.usersRepository.getUserByEmailRepository(queryGetDetail);
  }
}
