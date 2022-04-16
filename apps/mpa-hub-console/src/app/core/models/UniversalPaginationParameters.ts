export interface UniversalPaginationParameters {
  id?: number;
  pageSize: number;
  pageIndex: number;
  orderBy: string;
  orderByDirection: string;
  query?: string;
  tab?: number;
}
