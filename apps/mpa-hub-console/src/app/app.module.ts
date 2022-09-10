import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './shared/core.module';

import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { StoreModule } from '@ngrx/store';
import { _NavigationReducer } from './state/navigation/navigation.reducer';
import { NavigationKey } from './state/navigation/navigation.selector';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CookieModule.forRoot(),
    RouterModule,
    CoreModule,
    MaterialModule,

    StoreModule.forRoot({ 
      [NavigationKey]: _NavigationReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
