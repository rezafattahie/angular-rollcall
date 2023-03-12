import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { GridComponent } from './components/grid/grid.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    ModalComponent,
    GridComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    SharedRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
  ],
  exports: [
    GridComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
