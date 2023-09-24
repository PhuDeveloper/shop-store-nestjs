import { BrandListResponse } from '@/types/brand';
import { ApiResponse } from '@/types/response';
import { BrandEntity } from '../brand.entity';

export interface BrandListResponseData extends ApiResponse<BrandListResponse> {}
export interface BrandEntityResponseData extends ApiResponse<BrandEntity> {}
