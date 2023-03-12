import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { BasicDefinitionsService } from 'src/app/features/basic-definitions/services/basic-definitions.service';
import { IModalData, IFormFields } from 'src/app/features/models/modal-data.interface';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() modalData: IModalData = { actionMode: '', parent: '' };
  modalForm: FormGroup = new FormGroup({});

  constructor(
    private basicDefinitionsService: BasicDefinitionsService,
  ) { }


  ngOnInit(): void {
    this.createFormControls();
    console.log('%cmodal.component.ts line:25 this.modalData', 'color: white; background-color: #26bfa5;', this.modalData);

    if (this.modalData.actionMode === 'edit') {
      this.modalData.formFields?.forEach((field: IFormFields) => {
        if (field.type === 'checkbox') {
          this.modalData.selectedRow![field.name].forEach((val: any) => {


            this.modalForm.get(field.name + '.' + val)?.setValue(true)


          })
        }
        this.modalForm.get(field.name)?.patchValue(this.modalData.selectedRow![field.name])
      })
    }

    console.log('%cmodal.component.ts line:26 this.modalForm', 'color: white; background-color: #007acc;', this.modalForm);
  }

  createFormControls() {
    if (this.modalData.formFields && this.modalData.formFields.length > 0) {
      this.modalData.formFields.forEach((field: IFormFields) => {
        if (field.type === 'checkbox') {
          this.modalForm.addControl(field.name, new FormGroup({}));
          const groupFlield: any = this.modalForm.get(field.name);
          field.value.forEach((val: any) => {
            groupFlield.addControl(val.name, new FormControl(null, !field.allowNull ? Validators.required : null));
          })
        }

        this.modalForm.addControl(field.name, new FormControl(null, !field.allowNull ? Validators.required : null));
      })
      // this.groupControlsvalidation()
    }
  }

  groupControlsvalidation() {
    this.modalData.formFields?.forEach((field: IFormFields) => {
      if (field.type === 'checkbox') {
        if (field.value) {
          this.modalForm.controls['requiredControl'].clearValidators();
          this.modalForm.updateValueAndValidity()
        }
      }
    })
  }

  submitForm() {
    switch (this.modalData.actionMode) {
      case 'add': {
        this.basicDefinitionsService.addNewItem(this.modalForm.value, this.modalData.parent).subscribe({
          next: (res) => {

          },
          error: () => { }
        })

        break;
      }
      case 'edit': {
        this.basicDefinitionsService.editItem(this.modalForm.value, this.modalData.parent, this.modalData.selectedRow!.id)
          .subscribe({
            next: (result) => {

            },
            error: () => { }
          })
        break;
      }
      case 'delete': {
        this.basicDefinitionsService.delete(this.modalData.parent, this.modalData.selectedRow!['id'])
          .subscribe({
            next: (res) => {

            },
            error: () => { }
          })
        break;
      }
    }
  }

}
