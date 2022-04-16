import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'manage',
    data: {
      title: 'Roles',
    },
    children: [
      {
        path: 'roles',
        canActivate: [PermissionGuard],
        component: RolesComponent,
        data: {
          title: 'Roles',
          permissionIdentity: 'administrator.manage.roles',
        },
      },
      {
        path: 'permissions',
        canActivate: [PermissionGuard],
        component: PermissionsComponent,
        data: {
          title: 'Permissions',
          permissionIdentity: 'administrator.manage.permissions',
        },
      },
      {
        path: 'users',
        canActivate: [PermissionGuard],
        component: UsersComponent,
        data: {
          title: 'Users',
          permissionIdentity: 'administrator.manage.users',
        },
      },
    ]
  },

  {
    path: 'settings',
    canActivate: [PermissionGuard],
    component: SettingsComponent,
    data: {
      title: 'Settings',
      permissionIdentity: 'administrator.settings',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
