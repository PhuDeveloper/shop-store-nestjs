export class ResponseDto<T = any> {
  code: number;
  message: string;
  payload?: T;
}
