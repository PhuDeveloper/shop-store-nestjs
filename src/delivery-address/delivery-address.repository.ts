import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DeliveryAddressEntity } from './delivery-address.entity';
import { DeliveryAddressCreateDto } from './dto/delivery-address-create.dto';
import { ApiResponse } from '@/types/response';
import { StatusResponse } from '@/types/status';
import { DeliveryAddressUpdateDto } from './dto/delivery-address-update.dto';
import { DeliveryAddressListResponseData } from './type/delivery-address-response';
import { DeliveryAddressGetListDto } from './dto/delivery-address-get-list';
import { DeliveryAddressGetDetailDto } from './dto/delivery-address-get-detail.dto';

@Injectable()
export class DeliveryAddressRepository extends Repository<DeliveryAddressEntity> {
  constructor(private dataSource: DataSource) {
    super(DeliveryAddressEntity, dataSource.createEntityManager());
  }

  async createRepository(data: DeliveryAddressEntity): Promise<ApiResponse<DeliveryAddressEntity>> {
    try {
      const delivery = await this.save(data);

      if (!delivery) {
        throw new HttpException('Create delivery error', StatusResponse.SERVER_ERROR);
      }

      const response: ApiResponse<DeliveryAddressEntity> = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...delivery,
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getByIdRepository(data: DeliveryAddressGetDetailDto): Promise<ApiResponse<DeliveryAddressEntity>> {
    try {
      const query = this.createQueryBuilder('delivery-address');

      if (data) {
        query.andWhere('id = :id', { id: data.deliveryId });
      }
      const delivery = await query.getOne();

      if (!delivery) {
        throw new NotFoundException('Delivery not found');
      }

      const response: ApiResponse<DeliveryAddressEntity> = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          ...delivery,
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRepository(dataUpdate: DeliveryAddressUpdateDto): Promise<ApiResponse<DeliveryAddressEntity>> {
    const query = this.createQueryBuilder('delivery-address');
    const deliveryId = dataUpdate.deliveryAddressId;

    await query.update().set(dataUpdate.data).where('id=:deliveryId', { deliveryId }).execute();

    return await this.getByIdRepository({ deliveryId: deliveryId });
  }

  async getListRepository(dataGetList: DeliveryAddressGetListDto): Promise<DeliveryAddressListResponseData> {
    try {
      const { userId } = dataGetList;

      const page = dataGetList.page ? Number(dataGetList.page) : 1;
      const limit = dataGetList.limit ? Number(dataGetList.limit) : 20;

      const skip: number = limit * page - limit;

      const query = this.createQueryBuilder('delivery-address').take(limit).skip(skip);

      if (userId) {
        query.andWhere('delivery-address.user_id = :userId', { userId });
      }
      const [delivery, total] = await query.getManyAndCount();

      const response: DeliveryAddressListResponseData = {
        message: 'Success',
        statusCode: HttpStatus.OK,
        payload: {
          delivery_address_list: delivery,
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
}
