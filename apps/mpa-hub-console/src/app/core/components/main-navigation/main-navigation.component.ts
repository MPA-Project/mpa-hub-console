import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map, shareReplay } from 'rxjs';
import { NavItem } from '../../models';
import { MainNavListService } from '../main-navigation-list/main-navigation-list.services';
import { UniversalConfig } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'mpa-hub-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements AfterViewInit {
  
  @ViewChild('appDrawer') appDrawer!: ElementRef;
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: MainNavListService,
    private matDialog: MatDialog,
    private oauthServices: AuthService,
  ) {
    // this.userUsername = this.oauthServices.currentUserValue.username;
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }
}
