import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './core/services/auth.guard';
import { BasicDefinitionsComponent } from './features/basic-definitions/basic-definitions.component';
import { OperationsComponent } from './features/operations/operations.component';
import { ReportsComponent } from './features/reports/reports.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'basic-defs', component: BasicDefinitionsComponent, loadChildren: () => import('./features/basic-definitions/basic-definitions.module').then(m => m.BasicDefinitionsModule) },
      { path: 'operations', component: OperationsComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
