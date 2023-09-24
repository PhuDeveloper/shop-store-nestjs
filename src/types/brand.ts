import { BrandEntity } from '@/brand/brand.entity';

export interface Brand {
  brand_id: number;
  brand_name: string;
  brand_code: string;
  brand_created: number;
  brand_updated: number;
  is_deleted: number;
  brand_description?: string;
}

export interface BrandListResponse {
  brand_list: BrandEntity[];
  total: number;
  page: number;
  limit: number;
}
