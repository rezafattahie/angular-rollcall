import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class studentsComponent {

  isLoading: boolean = false;

  constructor(
    private modal: MatDialog,
    private api: ApiService
  ) { }

  gridData: any
  gridSettings: IGridSettings = { columns: {} };
  selectedrow: any
  classes: { [ket: string]: boolean } = {};
  isRowSelected: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.gridSettings = {
      columns: {

        'studentId': { title: 'Student Code' },
        'studentFName': { title: 'First Name' },
        'studentLName': { title: 'Last Name' },
        'coursesList': { title: 'Courses' }
      }
    }
    this.api.get('students').subscribe(result => {
      this.gridData = result
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
    this.classes = {
      'row-selected': this.isRowSelected,
    }
  }

  showModal(actionMode: string) {

    switch (actionMode) {

      case 'add': {
        this.modal.open(ModalComponent, {
          width: '60%',
          disableClose: true
        })
        break;
      }

      case 'edit': {
        if (!this.selectedrow) {
          alert('No item selected!');
          return;
        }
        this.modal.open(ModalComponent, {
          width: '60%',
          disableClose: true,
          data: this.selectedrow
        })
        break;
      }

      case 'delete': {
        alert('delete')
      }

    }


  }

}
