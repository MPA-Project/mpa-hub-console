import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler): Promise<HttpEvent<unknown>> {
    if (request.headers.has('Authorization')) return lastValueFrom(next.handle(request));

    let modifiedReq = request;
    const getAccessTokenCookie = this.authService.getAccessToken();
    const getRefreshTokenCookie = this.authService.getRefreshToken();
    if (getAccessTokenCookie && getAccessTokenCookie != null && getAccessTokenCookie != undefined) {
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${getAccessTokenCookie}`)
      });
    } else if (getRefreshTokenCookie && getRefreshTokenCookie != null && getRefreshTokenCookie != undefined) {
      const newAccessToken = await this.authService.regenerateAccessToken(getRefreshTokenCookie);
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${newAccessToken}`)
      });
    }

    return lastValueFrom(next.handle(modifiedReq));
  }
}
