import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mpa-hub-console/src/environments/environment';
import { Observable } from 'rxjs';
import { UniversalPaginationParameters, UniversalResponse, UniversalPaginationData, PermissionResponse } from '../../../core/models';
import { httpQueryParamsBuilder } from '../../../core/utils';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private baseURL = environment.API_BASE_URL;

  private baseConsoleAdmin = this.baseURL + environment.API_CONSOLE + environment.API_CONSOLE_ADMINISTRATOR;

  constructor(
    private http: HttpClient,
  ) { }

  getList({pageSize, orderBy, orderByDirection, pageIndex, query}: UniversalPaginationParameters): Observable<UniversalResponse<UniversalPaginationData<PermissionResponse[]>>> {
    const queryParams = httpQueryParamsBuilder({
      pageSize,
      pageIndex,
      orderBy,
      orderByDirection,
      query,
    });
    return this.http.get<UniversalResponse<UniversalPaginationData<PermissionResponse[]>>>(`${this.baseConsoleAdmin}manage/permissions?${queryParams}`);
  }
}
