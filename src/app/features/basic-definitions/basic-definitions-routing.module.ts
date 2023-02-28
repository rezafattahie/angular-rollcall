import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDefinitionsComponent } from './basic-definitions.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [
  {
    path: '', component: BasicDefinitionsComponent, children: [
      { path: 'persons', component: PersonsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDefinitionsRoutingModule { }
