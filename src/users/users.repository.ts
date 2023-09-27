import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { UsersEntityResponseData } from './type/response-users';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getUserByEmailRepository(queryGetDetail: GetDetailUserDto): Promise<UsersEntityResponseData> {
    try {
      const { email } = queryGetDetail;
      const query = this.createQueryBuilder('users');

      if (email) {
        query.andWhere('email = :email', { email });
      }

      const user = await query.leftJoinAndSelect('users.role', 'role').getOne();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const response: UsersEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...user,
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUserRepository(queryCreate: UsersEntity): Promise<UsersEntityResponseData> {
    try {
      const user = await this.save(queryCreate);
      if (!user) {
        throw new HttpException('Create user error', StatusResponse.SERVER_ERROR);
      }

      const response: UsersEntityResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...user,
        },
      };
      return response;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Email bạn đăng kí đã tồn tại', StatusResponse.NOT_FOUND);
      }
      throw error;
    }
  }
}
