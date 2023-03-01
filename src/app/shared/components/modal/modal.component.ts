import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  studentsForm !: FormGroup;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {

  }

  ngOnInit(): void {
    this.studentsForm = new FormGroup(({
      personId: new FormControl(null, Validators.required),
      personFName: new FormControl(null, Validators.required),
      personLName: new FormControl(null, Validators.required),
    })
    )

    if (this.editData) {
      this.studentsForm.controls['personId'].setValue(this.editData[0].personId);
      this.studentsForm.controls['personFName'].setValue(this.editData[0].personFName);
      this.studentsForm.controls['personLName'].setValue(this.editData[0].personLName);

    }
  }

  onAddNewPerson() {
    if (this.studentsForm.valid) {
      this.api.post(this.studentsForm.value, 'students').subscribe(result => {
        alert('New Person Added.');
        this.studentsForm.reset();
      }, error => {
        alert('Failed To Add New Person')
      });
    }

  }

}
