import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicDefinitionsComponent } from './basic-definitions.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { studentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [
  {
    path: '', component: BasicDefinitionsComponent, children: [
      { path: 'students', component: studentsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'holidays', component: HolidaysComponent },
      { path: 'courses', component: CoursesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDefinitionsRoutingModule { }
