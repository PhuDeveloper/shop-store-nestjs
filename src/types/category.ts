import { CategoryEntity } from '@/category/category.entity';

export interface Category {
  category_id: number;
  category_name: string;
  category_code: string;
  category_created: number;
  category_updated: number;
  is_deleted: number;
  category_description?: string;
}

export interface CategoryListResponse {
  category_list: CategoryEntity[];
  total: number;
  page: number;
  limit: number;
}
