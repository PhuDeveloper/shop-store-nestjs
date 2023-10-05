import { StatusResponse } from '@/types/status';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GetDetailUserDto } from './dto/get-detail-user.dto';
import { UserListResponseData, UsersEntityResponseData } from './type/response-users';
import { UsersEntity } from './users.entity';
import { GetListUserDto } from './dto/get-list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getUserByEmailOrIdRepository(queryGetDetail: GetDetailUserDto): Promise<UsersEntityResponseData> {
    try {
      const { email, userId } = queryGetDetail;
      const query = this.createQueryBuilder('users');

      if (email) {
        query.andWhere('email = :email', { email });
      }

      if (userId) {
        query.andWhere('users.id = :userId', { userId });
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

  async getListRepository(querySearch: GetListUserDto): Promise<UserListResponseData> {
    try {
      const { address, email, fullName, phone, roleId } = querySearch;
      const page = querySearch.page ? Number(querySearch.page) : 1;
      const limit = querySearch.limit ? Number(querySearch.limit) : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('users').leftJoinAndSelect('users.role', 'role').take(limit).skip(skip);

      if (address) {
        query.andWhere('address= :address', { address });
      }

      if (email) {
        query.andWhere('email = :email', { email });
      }

      if (fullName) {
        query.andWhere('full_name = :fullName', { fullName });
      }

      if (phone) {
        query.andWhere('phone = :phone', { phone });
      }

      if (roleId) {
        query.andWhere('role_id = :roleId', { roleId });
      }

      const [users, total] = await query.getManyAndCount();

      const response: UserListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          user_list: users,
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

  async updateRepository(queryUpdate: UpdateUserDto): Promise<UsersEntityResponseData> {
    try {
      const query = this.createQueryBuilder('users');
      const userId = queryUpdate.userId;
      await query.update().set(queryUpdate.data).where('users.id = :userId', { userId }).execute();

      const user = await this.getUserByEmailOrIdRepository({ userId: userId });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
