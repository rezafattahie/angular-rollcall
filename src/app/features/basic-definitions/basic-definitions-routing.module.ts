import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDefinitionsComponent } from './basic-definitions.component';
import { studentsComponent } from './components/students/students.component';

const routes: Routes = [
  {
    path: '', component: BasicDefinitionsComponent, children: [
      { path: 'students', component: studentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDefinitionsRoutingModule { }
