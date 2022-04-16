import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROLE_ADMIN } from '../core/constants';
import { PermissionGuard } from '../core/guards/permission.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionGuard],
    loadChildren: () => import('./../features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard',
      permissionIdentity: 'dashboard',
    },
  },
  {
    path: 'chino',
    canLoad: [RoleGuard],
    loadChildren: () => import('./../features/administrator/administrator.module').then(m => m.AdministratorModule),
    data: {
      title: 'Administrator',
      roles: [
        ROLE_ADMIN,
      ]
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsittoyaRoutingModule { }
