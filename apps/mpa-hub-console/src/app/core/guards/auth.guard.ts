import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { catchError, from, map, Observable, of } from 'rxjs';
import { NavigationSet } from '../../state/navigation/navigation.action';
import { ALLOWED_ROLES } from '../constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.authService.checkingRoles()).pipe(
      map((response) => {
        if (response) {
          let allowed = false;
          if (response.data && response.data?.length > 0) {
            response.data?.forEach((role) => {
              if (ALLOWED_ROLES.includes(role)) {
                allowed = true;
              }
            });
          }
          if (!allowed) {
            this.navigateError('403');
          }
          return allowed;
        }
        this.navigateError('403');
        return false;
      }),
      catchError((error) =>
        of(error).pipe(
          map(() => {
            this.navigateError('403');
            return false;
          }),
        ),
      ),
    );
  }

  navigateError(code: string): void {
    this.router.navigate(['/error'], { queryParams: { reason: code } });
  }
}
