import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ModalFormComponent } from './components/modal/modal-form.component';
import { GridComponent } from './components/grid/grid.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    ModalFormComponent,
    GridComponent,
    LoadingSpinnerComponent,
    DatePickerComponent,

  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgbDatepickerModule,
  ],
  exports: [
    GridComponent,
    ModalFormComponent,
    LoadingSpinnerComponent,
    DatePickerComponent,
  ]
})
export class SharedModule { }
