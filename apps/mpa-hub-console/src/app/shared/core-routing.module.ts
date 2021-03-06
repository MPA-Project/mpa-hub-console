import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from './../../environments/environment';
import { ErrorComponent } from './../core/components/error/error.component';
import { AuthGuard } from './../core/guards/auth.guard';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: environment.ROUTE_BASE_URL
  },
  {
    path: 'error', component: ErrorComponent,
    data: {
      title: 'Error',
    }
  },

  {
    path: 'info', component: ErrorComponent,
    data: {
      title: 'Info',
    }
  },


  {
    path: 'whatsittoya',
    canLoad: [AuthGuard],
    loadChildren: () => import('./../features/whatsittoya.module').then(m => m.WhatsittoyaModule),
  },


  { path: '**', redirectTo: '/error?reason=404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
