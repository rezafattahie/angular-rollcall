import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDefinitionsComponent } from './basic-definitions/basic-definitions.component';
import { OperationsComponent } from './operations/operations.component';
import { ReportsComponent } from './reports/reports.component';
import { PersonsComponent } from './basic-definitions/components/persons/persons.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasicDefinitionsComponent,
    OperationsComponent,
    ReportsComponent,
    PersonsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class FeaturesModule { }
