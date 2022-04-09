import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SidenavComponent } from '../core/components/sidenav/sidenav.component';
import { ToolbarComponent } from '../core/components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent,
  ],
})
export class CoreModule { }
