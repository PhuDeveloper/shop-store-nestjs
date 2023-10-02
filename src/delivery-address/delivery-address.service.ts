import { Injectable } from '@nestjs/common';
import { DeliveryAddressRepository } from './delivery-address.repository';
import { DeliveryAddressGetListDto } from './dto/delivery-address-get-list';
import { DeliveryAddressCreateDto } from './dto/delivery-address-create.dto';
import { DeliveryAddressEntity } from './delivery-address.entity';
import { DeliveryAddressUpdateDto } from './dto/delivery-address-update.dto';
import { DeliveryAddressGetDetailDto } from './dto/delivery-address-get-detail.dto';

@Injectable()
export class DeliveryAddressService {
  constructor(private deliveryRepository: DeliveryAddressRepository) {}

  async getListService(querySearch: DeliveryAddressGetListDto) {
    return await this.deliveryRepository.getListRepository(querySearch);
  }

  async createService(queryCreate: DeliveryAddressCreateDto) {
    const data = {
      address: queryCreate.address,
      name: queryCreate.name,
      phone: queryCreate.phone,
      user: {
        id: queryCreate.userId,
      },
      isDefault: queryCreate.isDefault,
    } as DeliveryAddressEntity;
    return await this.deliveryRepository.createRepository(data);
  }

  async getByIdService(data: DeliveryAddressGetDetailDto) {
    return await this.deliveryRepository.getByIdRepository(data);
  }

  async updateService(queryUpdate: DeliveryAddressUpdateDto) {
    return await this.deliveryRepository.updateRepository(queryUpdate);
  }
}
