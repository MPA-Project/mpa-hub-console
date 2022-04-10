import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { catchError, filter, from, map, mergeMap, of, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { NavItem } from './core/models';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'mpa-hub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = environment.WEB_NAME;

  loadingPage = false;

  isSigned = false;
  isVeryfyingAuth = true;

  baseUrl = environment.ROUTE_BASE_URL;

  sidenavNavigation: NavItem[] = [];
  isSidenavNavigationLoading = false;

  routeEventLoading!: Subscription;
  routeEventData!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    ) {
      this.routeEventLoading = this.router.events.subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            // console.log('route start');
            this.loadingPage = true;
            break;
          }
  
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            // console.log('route finish');
            this.loadingPage = false;
            break;
          }
          default: {
            break;
          }
        }
      });
  }

  ngOnInit(): void {

    from(this.authService.checkingCredentials()).pipe(
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
    ).subscribe((response: boolean) => {
      this.isSigned = response;
      this.isVeryfyingAuth = false;
    });

    this.routeEventData = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      ).subscribe((event) => {
        const title = event?.['title'] || environment.WEB_NAME;
        this.title = title;
        this.titleService.setTitle(title);
      });
  }


  ngOnDestroy(): void {
    if (this.routeEventLoading) {
      this.routeEventLoading.unsubscribe();
    }

    if (this.routeEventData) {
      this.routeEventData.unsubscribe();
    }
  }
}
