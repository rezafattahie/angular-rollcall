import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
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
  selectedrow: any
  classes: { [ket: string]: boolean } = {};
  isMyClass: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.api.get('students').subscribe(result => {
      this.gridData = result
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });

    this.classes = {
      'myClass': this.isMyClass,
      'yourClass': !this.isMyClass
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

  onRowSelect(event: any) {
    console.log('%cstudents.component.ts line:54 event', 'color: white; background-color: coral;', event);
    this.selectedrow = event
  }

}
