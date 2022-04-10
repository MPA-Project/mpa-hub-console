import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NavItem } from '../../models';
import { MainNavListService } from './main-navigation-list.services';

@Component({
  selector: 'mpa-hub-main-navigation-list',
  templateUrl: './main-navigation-list.component.html',
  styleUrls: ['./main-navigation-list.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MainNavigationListComponent implements OnInit {
  @HostBinding('attr.aria-expanded') ariaExpanded: boolean;
  @Input() item!: NavItem;
  @Input() depth = 1;
  expanded = false;
  isSelected = false;
  baseUrl = environment.ROUTE_BASE_URL;

  constructor(
    public router: Router,
    public navService: MainNavListService,
  ) {
    this.ariaExpanded = this.expanded;
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string | undefined) => {
      if (this.item.route && url) {
        if (this.item.route !== this.baseUrl) {
          this.expanded = url.indexOf(`${this.item.route}`) === 0;
          // console.group('Route check: ', this.expanded, ' is baseUrl ', this.item.route !== this.baseUrl);
          // console.log(`Checking '${this.item.route}' against '${url}'`);
          this.ariaExpanded = this.expanded;
          this.isSelected = this.expanded;
          // console.log(`${this.item.route} is expanded: ${this.expanded}`);
          // console.groupEnd();
        }
      }
    });
  }

  onItemSelected(item: NavItem): void {
    if (!item.children || !item.children.length) {
      // console.log('trigger A');
      // this.router.navigate([item.route]);
      // this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      // console.log('trigger B');
      this.expanded = !this.expanded;
    }
  }

}
