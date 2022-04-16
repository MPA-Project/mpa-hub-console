import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreRoutingModule } from './core-routing.module';
import { ErrorComponent } from '../core/components/error/error.component';
import { MainNavigationComponent } from '../core/components/main-navigation/main-navigation.component';
import { MainNavigationListComponent } from '../core/components/main-navigation-list/main-navigation-list.component';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    MainNavigationComponent,
    MainNavigationListComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    MainNavigationComponent,
    MainNavigationListComponent,
    ErrorComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
