export interface IApiResponse<T> {
  ok: boolean;
  response?: T;
  error?: string;
}
