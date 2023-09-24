import { ProductListResponse } from '@/types/product';
import { ApiResponse } from '@/types/response';
import { ProductEntity } from '../product.entity';

export interface ProductListResponseData extends ApiResponse<ProductListResponse> {}
export interface ProductEntityResponseData extends ApiResponse<ProductEntity> {}
