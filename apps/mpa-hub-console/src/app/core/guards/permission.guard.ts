import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, from, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const getPage = route.data?.['permissionIdentity'];
      if (!getPage) {
        return true;
      }

      return from(this.authService.checkingPermissions(getPage)).pipe(
        map((response) => {
          if (response) {
            return true;
          } else {
            this.router.navigate(['/error'], { queryParams: { reason: '403' } });
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
      );
  }

}
