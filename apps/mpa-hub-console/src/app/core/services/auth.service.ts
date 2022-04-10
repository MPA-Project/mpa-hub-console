import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User } from '../models/User';
import { UniversalResponse, RefreshToken, UserPermission, UserRole } from '../models';
import { LsSetData } from '../utils/LocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environment.API_BASE_URL;

  private baseAuth = this.baseURL + environment.API_OAUTH;

  private baseUser = this.baseURL + environment.API_USER;

  private cookieNameAccess = 'SID-MYPONYASIA';
  private cookieNameRefresh = 'SIDR-MYPONYASIA';
  private localStorageName = 'CredentialsUser';

  private currentUserSubject!: BehaviorSubject<User>;
  private currentUser!: Observable<User>;
  private isValidUser!: boolean;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    // this.initCredentials();
  }

  async checkingCredentials(): Promise<boolean> {
    const getRefreshTokenCookie = this.cookieService.get(this.cookieNameRefresh);
    if (getRefreshTokenCookie && getRefreshTokenCookie != null && getRefreshTokenCookie != undefined) {

      try {
        const getAccessToken: UniversalResponse<RefreshToken> = await lastValueFrom(this.requestAccessToken(getRefreshTokenCookie));
        if (getAccessToken != undefined && !getAccessToken.error && getAccessToken.data) {
          this.setTokenCookie(getAccessToken.data);
          const getCurrentUser: UniversalResponse<User> = await lastValueFrom(this.getCurrentUser(getAccessToken.data.access_token));
          LsSetData(this.localStorageName, getCurrentUser.data);
          return true;
        }
      } catch (error) {
        console.error(error);
      }
    }

    return false;
  }

  async regenerateAccessToken(refreshToken: string): Promise<string> {
    const getAccessToken: UniversalResponse<RefreshToken> = await lastValueFrom(this.requestAccessToken(refreshToken));
    if (getAccessToken != undefined && !getAccessToken.error && getAccessToken.data) {
      this.setTokenCookie(getAccessToken.data);
      return getAccessToken.data.access_token;
    }
    return '';
  }

  getAccessToken(): string {
    return this.cookieService.get(this.cookieNameAccess);
  }

  getRefreshToken(): string {
    return this.cookieService.get(this.cookieNameRefresh);
  }

  checkingRoles(): Observable<UniversalResponse<string[]>> {
    return this.http.post<UniversalResponse<string[]>>(this.baseAuth + `roles`, null);
  }

  checkingPermissions(identity: string): Observable<UniversalResponse<string[]>> {
    return this.http.post<UniversalResponse<string[]>>(this.baseAuth + `permissions?identity=${identity}`, null);
  }

  requestAccessToken(refreshToken: string): Observable<UniversalResponse<RefreshToken>> {
    return this.http.post<UniversalResponse<RefreshToken>>(`${this.baseAuth}refresh-token`, null, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
  }

  getCurrentUser(accessToken: string): Observable<UniversalResponse<User>> {
    return this.http.get<UniversalResponse<User>>(`${this.baseUser}me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  setTokenCookie(data: RefreshToken): void {
    this.cookieSet(environment.COOKIE_SID, data.access_token, {
      domain: environment.COOKIE_DOMAIN,
      secure: environment.COOKIE_SECURE,
      httpOnly: environment.COOKIE_HTTP_ONLY,
      path: '/',
      expires: new Date(data.acces_token_expired),
    });
    this.cookieSet(environment.COOKIE_SIDR, data.refresh_token, {
      domain: environment.COOKIE_DOMAIN,
      secure: environment.COOKIE_SECURE,
      httpOnly: environment.COOKIE_HTTP_ONLY,
      path: '/',
      expires: new Date(data.refresh_token_expired),
    });
  }

  cookieSet(key: string, data: string, options?: CookieOptions): void {
    this.cookieService.put(key, data, options);
  }

}
