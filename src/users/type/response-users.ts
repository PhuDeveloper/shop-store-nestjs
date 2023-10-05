import { ApiResponse } from '@/types/response';
import { UsersEntity } from '../users.entity';

export interface UserListResponse {
  user_list: UsersEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface UserListResponseData extends ApiResponse<UserListResponse> {}

export interface UsersEntityResponseData extends ApiResponse<UsersEntity> {}
