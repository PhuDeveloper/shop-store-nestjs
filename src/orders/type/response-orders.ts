import { ApiResponse } from '@/types/response';
import { OrdersEntity } from '../orders.entity';

export interface OrderListResponse {
  order_list: OrdersEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderListResponseData extends ApiResponse<OrderListResponse> {}
