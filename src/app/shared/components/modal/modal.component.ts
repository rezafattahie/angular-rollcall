import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { BasicDefinitionsService } from 'src/app/features/basic-definitions/services/basic-definitions.service';
import { IModalData } from 'src/app/features/models/modal-data.interface';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() modalData: IModalData = { actionMode: '', parent: '' };
  @ViewChild('closebutton') closebutton: any;

  constructor(
    private basicDefinitionsService: BasicDefinitionsService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modalData']) {

    }
  }

  ngOnInit(): void {
    console.log('%cmodal.component.ts line:26 this.modalData', 'color: white; background-color: #007acc;', this.modalData);
  }
  submitForm(form: NgForm) {
    console.log('%cmodal.component.ts line:20 this.modalForm', 'color: white; background-color: #26bfa5;', form);
    switch (this.modalData.actionMode) {
      case 'add': {
        this.basicDefinitionsService.addNewItem(form.value, this.modalData.parent).subscribe({
          next: (res) => {
            console.log('%cmodal.component.ts line:35 res', 'color: #007acc;', res);
          },
          error: () => { }
        })
        break;
      }
      case 'edit': {

        break;
      }
      case 'delete': {

        break;
      }

    }

    this.closebutton.nativeElement.click();
  }

}
