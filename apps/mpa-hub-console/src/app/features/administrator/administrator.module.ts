import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    PermissionsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class AdministratorModule { }
