import { ApiResponse } from '@/types/response';
import { CartsEntity } from '../carts.entity';

export interface CartEntityResponseData extends ApiResponse<CartsEntity> {}
