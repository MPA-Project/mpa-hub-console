import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mpa-hub-console/src/environments/environment';
import { Observable } from 'rxjs';
import { UniversalPaginationParameters, UniversalResponse, UniversalPaginationData, UserResponse } from '../../../core/models';
import { httpQueryParamsBuilder } from '../../../core/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = environment.API_BASE_URL;

  private baseConsoleAdmin = this.baseURL + environment.API_CONSOLE + environment.API_CONSOLE_ADMINISTRATOR;

  constructor(
    private http: HttpClient,
  ) { }

  getList({pageSize, orderBy, orderByDirection, pageIndex, query}: UniversalPaginationParameters): Observable<UniversalResponse<UniversalPaginationData<UserResponse[]>>> {
    const queryParams = httpQueryParamsBuilder({
      pageSize,
      pageIndex,
      orderBy,
      orderByDirection,
      query,
    });
    return this.http.get<UniversalResponse<UniversalPaginationData<UserResponse[]>>>(`${this.baseConsoleAdmin}manage/users?${queryParams}`);
  }
}
