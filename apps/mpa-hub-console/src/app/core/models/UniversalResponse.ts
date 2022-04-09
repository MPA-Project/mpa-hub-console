export interface UniversalResponse<T> {
  data?: T;
  error: boolean;
  message: string;
}
