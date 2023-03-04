import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDefinitionsRoutingModule } from './basic-definitions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { studentsComponent } from './components/students/students.component';
import { BasicDefinitionsComponent } from './basic-definitions.component';
import { MatIconModule } from '@angular/material/icon';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { CoursesComponent } from './components/courses/courses.component';


@NgModule({
  declarations: [
    BasicDefinitionsComponent,
    studentsComponent,
    TeachersComponent,
    HolidaysComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    BasicDefinitionsRoutingModule,
    SharedModule,
  ]
})
export class BasicDefinitionsModule { }
