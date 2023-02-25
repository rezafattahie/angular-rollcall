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
  personsForm !: FormGroup;

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {

  }

  ngOnInit(): void {
    this.personsForm = new FormGroup(({
      personId: new FormControl(null, Validators.required),
      personFName: new FormControl(null, Validators.required),
      personLName: new FormControl(null, Validators.required),
    })
    )

    if (this.editData) {
      this.personsForm.controls['personId'].setValue(this.editData[0].personId);
      this.personsForm.controls['personFName'].setValue(this.editData[0].personFName);
      this.personsForm.controls['personLName'].setValue(this.editData[0].personLName);

    }
  }

  onAddNewPerson() {
    if (this.personsForm.valid) {
      this.api.post(this.personsForm.value, 'persons').subscribe(result => {
        alert('New Person Added.');
        this.personsForm.reset();
      }, error => {
        alert('Failed To Add New Person')
      });
    }

  }

}
