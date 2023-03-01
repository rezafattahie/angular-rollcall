import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDefinitionsRoutingModule } from './basic-definitions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { studentsComponent } from './components/students/students.component';
import { BasicDefinitionsComponent } from './basic-definitions.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BasicDefinitionsComponent,
    studentsComponent
  ],
  imports: [
    CommonModule,
    BasicDefinitionsRoutingModule,
    SharedModule,
  ]
})
export class BasicDefinitionsModule { }
