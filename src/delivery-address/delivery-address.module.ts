import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddressEntity } from './delivery-address.entity';
import { DeliveryAddressRepository } from './delivery-address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryAddressEntity])],
  providers: [DeliveryAddressService, DeliveryAddressRepository],
  controllers: [DeliveryAddressController],
})
export class DeliveryAddressModule {}
