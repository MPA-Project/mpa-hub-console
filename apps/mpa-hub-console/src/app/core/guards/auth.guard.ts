import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { catchError, from, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.authService.checkingCredentials()).pipe(
      map((response: boolean) => {
        if (response) {
          return true;
        } else {
          this.router.navigate(['/error'], { queryParams: { reason: '401' } });
          return false;
        }
      }),
      catchError((error) =>
        of(error).pipe(
          map(() => {
            this.router.navigate(['/error'], { queryParams: { reason: '403' } });
            return false;
          }),
        ),
      ),
    );;
  }
}
