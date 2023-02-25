import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

  constructor(
    private modal: MatDialog,
    private api: ApiService
  ) { }

  gridData: any
  selectedrow: any
  classes: { [ket: string]: boolean } = {};
  isMyClass: boolean = false;

  ngOnInit() {
    this.api.get('persons').subscribe(result => {
      this.gridData = result
    })

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
    console.log('%cpersons.component.ts line:54 event', 'color: white; background-color: coral;', event);
    this.selectedrow = event
  }

}
