export interface ApiResponse<T = any> {
  statusCode: number;
  statusError?: number;
  message: string;
  payload?: T;
}
