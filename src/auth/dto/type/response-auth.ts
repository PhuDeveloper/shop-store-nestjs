import { ApiResponse } from '@/types/response';

export interface TokenResult {
  accessToken: string;
  roleName: string;
  userId: number;
}

export interface AuthTokenResponseData extends ApiResponse<TokenResult> {}
