import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RolesResponse, UniversalPaginationData, UniversalPaginationParameters, UniversalResponse } from '../../../core/models';
import { httpQueryParamsBuilder } from '../../../core/utils/UniversalUtils';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseURL = environment.API_BASE_URL;

  private baseConsoleAdmin = this.baseURL + environment.API_CONSOLE + environment.API_CONSOLE_ADMINISTRATOR;

  constructor(
    private http: HttpClient,
  ) { }

  getList({pageSize, orderBy, orderByDirection, pageIndex, query}: UniversalPaginationParameters): Observable<UniversalResponse<UniversalPaginationData<RolesResponse[]>>> {
    const queryParams = httpQueryParamsBuilder({
      pageSize,
      pageIndex,
      orderBy,
      orderByDirection,
      query,
    });
    return this.http.get<UniversalResponse<UniversalPaginationData<RolesResponse[]>>>(`${this.baseConsoleAdmin}manage/roles?${queryParams}`);
  }

}
