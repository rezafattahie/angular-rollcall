import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { IModalData, IFormFields } from 'src/app/features/models/modal-data.interface';

@Component({
  selector: 'app-modalForm',
  templateUrl: './modal-Form.component.html',
  styleUrls: ['./modal-Form.component.scss']
})
export class ModalFormComponent implements OnInit, OnChanges {

  @Input() modalData: IModalData = { actionMode: '' };
  @Output() onCancel = new EventEmitter<boolean>()
  @Output() onSubmit = new EventEmitter<{}>()

  modalForm: FormGroup = new FormGroup({});
  imageSrc: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modalData']) {
    }
  }


  ngOnInit(): void {
    this.createFormControls();
    console.log('%cmodal.component.ts line:25 this.modalData', 'color: white; background-color: #26bfa5;', this.modalData);

    if (this.modalData.actionMode === 'Edit') {
      this.modalData.formFields?.forEach((field: IFormFields) => {
        if (field.type === 'checkbox') {
          this.modalData.selectedRow![field.name].forEach((val: any) => {
            this.modalForm.get(field.name + '.' + val)?.setValue(true)
          })
        }
        if (field.type === 'image') {
          this.imageSrc = this.modalData.selectedRow![field.name];
          const file = this.modalForm.get(field.name)

        }
        // else {
        this.modalForm.get(field.name)?.patchValue(this.modalData.selectedRow![field.name])
        // }
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
    const file: any = document.getElementById('imageUrl');
    // this.modalForm.get('imageUrl')?.patchValue(file.value);
    this.onSubmit.emit(this.modalForm.value);
  }

  onClose() {
    this.onCancel.emit(true);
  }

}
