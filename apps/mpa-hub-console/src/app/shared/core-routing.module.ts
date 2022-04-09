import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { ErrorComponent } from '../core/components/error/error.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: environment.ROUTE_BASE_URL
  },
  {
    path: 'error', component: ErrorComponent,
    data: {
      title: 'Error',
      sideName: 'Error'
    }
  },
  { path: '**', redirectTo: '/error?reason=404' },

  {
    path: 'whatsittoya',
    loadChildren: () => import('./../features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
