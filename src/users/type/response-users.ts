import { ApiResponse } from '@/types/response';
import { UsersEntity } from '../users.entity';

export interface UsersEntityResponseData extends ApiResponse<UsersEntity> {}
