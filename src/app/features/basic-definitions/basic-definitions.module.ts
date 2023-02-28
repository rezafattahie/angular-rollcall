import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicDefinitionsRoutingModule } from './basic-definitions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonsComponent } from './components/persons/persons.component';
import { BasicDefinitionsComponent } from './basic-definitions.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BasicDefinitionsComponent,
    PersonsComponent
  ],
  imports: [
    CommonModule,
    BasicDefinitionsRoutingModule,
    SharedModule,
  ]
})
export class BasicDefinitionsModule { }
