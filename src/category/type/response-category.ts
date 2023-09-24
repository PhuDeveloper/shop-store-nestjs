import { CategoryListResponse } from '@/types/category';
import { ApiResponse } from '@/types/response';
import { CategoryEntity } from '../category.entity';

export interface CategoryListResponseData extends ApiResponse<CategoryListResponse> {}
export interface CategoryEntityResponseData extends ApiResponse<CategoryEntity> {}
