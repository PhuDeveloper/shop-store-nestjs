import { BrandEntity } from '@/brand/brand.entity';
import { ProductEntity } from '@/product/product.entity';

export interface Product {
  product_id: number;
  product_name: string;
  product_status: number;
  product_price_org: number;
  product_price_discount: number;
  product_start: number;
  product_description: string | null;
  product_code: string;
  product_image: string;
  product_image_list: string | null;
  product_created: number;
  product_updated: number | null;
  product_type: number | null;
  is_deleted: number;
  brand: BrandEntity;
}

export interface ProductListResponse {
  product_list: ProductEntity[];
  total: number;
  page: number;
  limit: number;
}
