import { ApiResponse } from '@/types/response';
import { DeliveryAddressEntity } from '../delivery-address.entity';

export interface DeliveryAddressListResponse {
  delivery_address_list: DeliveryAddressEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface DeliveryAddressListResponseData extends ApiResponse<DeliveryAddressListResponse> {}
