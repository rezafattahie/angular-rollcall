import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PersonsComponent } from './features/basic-definitions/components/persons/persons.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
