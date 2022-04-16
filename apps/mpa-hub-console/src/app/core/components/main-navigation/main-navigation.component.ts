import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map, shareReplay } from 'rxjs';
import { NavItem } from '../../models';
import { MainNavListService } from '../main-navigation-list/main-navigation-list.services';
import { UniversalConfig } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LsGetData, LsSetData } from '../../utils/LocalStorage';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'mpa-hub-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements AfterViewInit {

  @ViewChild('appDrawer') appDrawer!: ElementRef<MatDrawer>;
  @Input() dataTitle!: string;
  @Input() navList!: NavItem[];
  @Input() isFetching = false;
  @Input() isSidenavNavigationLoading = false;

  FRONTEND_URL = environment.FRONTEND_URL;
  userUsername!: string;

  aboutConsole = `${UniversalConfig.name} v${UniversalConfig.version}`;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  stateSidenav = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: MainNavListService,
    // private matDialog: MatDialog,
    // private oauthServices: AuthService,
  ) {
    const stateSidebar: string | null = LsGetData("isSidenavOpen");
    if (stateSidebar === 'open!') {
      this.stateSidenav = true;
    } else if (stateSidebar === 'close!') {
      this.stateSidenav = false;
    }
    console.log('this.stateSidenav', this.stateSidenav)
  }

  toggleSidenav(drawer: MatDrawer): void {
    drawer?.toggle();
    // LsSetData("isSidenavOpen", drawer?.opened);
  }

  setSidenav(state: string): void {
    LsSetData("isSidenavOpen", state);
  }

  ngAfterViewInit(): void {
    console.log();
    this.navService.appDrawer = this.appDrawer;
  }
}
