import { ApiResponse } from '@/types/response';

export interface TokenResult {
  accessToken: string;
  roleName: string;
}

export interface AuthTokenResponseData extends ApiResponse<TokenResult> {}
