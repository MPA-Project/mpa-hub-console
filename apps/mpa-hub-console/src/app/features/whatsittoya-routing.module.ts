import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../core/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionGuard],
    loadChildren: () => import('./../features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard',
      permissionIdentity: 'dashboard',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsittoyaRoutingModule { }
