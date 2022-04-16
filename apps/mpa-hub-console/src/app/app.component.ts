import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, from, map, mergeMap, Observable, of, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { NavItem } from './core/models';
import { AuthService } from './core/services/auth.service';
import { NavigationEntity } from './state/navigation/navigation.model';
import { selectNavigationSelector } from './state/navigation/navigation.selector';

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

  sidenavNavigation: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/whatsittoya',
      isDashboard: true,
    },
    {
      displayName: 'Administrator',
      iconName: 'dashboard',
      route: '/whatsittoya/chino',
      routeDisabled: true,
      children: [
        {
          displayName: 'Manage',
          iconName: 'dashboard',
          route: '/whatsittoya/chino/manage',
          routeDisabled: true,
          children: [
            {
              displayName: 'Roles',
              iconName: 'dashboard',
              route: '/whatsittoya/chino/manage/roles',
            },
            {
              displayName: 'Permission',
              iconName: 'dashboard',
              route: '/whatsittoya/chino/manage/permissions',
            },
            {
              displayName: 'Users',
              iconName: 'dashboard',
              route: '/whatsittoya/chino/manage/users',
            },
          ]
        },
        {
          displayName: 'Settings',
          iconName: 'dashboard',
          route: '/whatsittoya/chino/settings',
        },
      ],
    },
  ];
  isSidenavNavigationLoading = false;
  navigationEnable = true;

  routeEventLoading!: Subscription;
  routeEventData!: Subscription;

  navigation$!: Observable<NavigationEntity>;
  navigationSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store,
    ) {
      this.navigation$ = store.select(selectNavigationSelector);

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

    this.navigationSubscription = this.navigation$.subscribe((navigation) => {
      this.navigationEnable = !navigation.hide;
    });

    from(this.authService.checkingCredentials()).pipe(
      map((response: boolean) => {
        if (response) {
          return true;
        } else {
          this.router.navigate(['/info'], { queryParams: { reason: '401' } });
          return false;
        }
      }),
      catchError((error) =>
        of(error).pipe(
          map(() => {
            this.router.navigate(['/info'], { queryParams: { reason: '403' } });
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

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
