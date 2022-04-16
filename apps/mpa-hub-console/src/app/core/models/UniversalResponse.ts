export interface UniversalResponse<T> {
  data?: T;
  error: boolean;
  message: string;
}

export interface UniversalPaginationData<T> {
  list: T;
  total: number;
}
