import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';
import { IModalData } from 'src/app/features/models/modal-data.interface';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class studentsComponent {

  isLoading: boolean = false;
  modalData: IModalData = { actionMode: '', parent: '' };

  constructor(
    private modal: NgbModal,
    private basicDefinitionsService: BasicDefinitionsService,
    private utility: UtilityService,
    private toast: ToastrService
  ) { }

  gridData: any;
  courses: any;
  gridSettings: IGridSettings = { columns: {} };
  selectedrow: any
  classes: { [ket: string]: boolean } = {};
  isRowSelected: boolean = false;

  ngOnInit() {
    this.getAllStudents();
    this.getAllCources();
    this.gridSettings = {
      columns: {
        'studentId': { title: 'Code' },
        'studentFName': { title: 'Name' },
        'studentLName': { title: 'Last Name' },
        'courses': { title: 'Courses' }
      }
    }

    this.classes = {
      'row-selected': this.isRowSelected,
    }
  }

  getAllCources() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('courses').subscribe(result => {
      this.courses = result;
      this.isLoading = false;
    })
  }

  getAllStudents() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('students').subscribe({
      next: (result: any) => {
        let courses;
        this.gridData = result;
        result.forEach((res: any, index: any) => {
          this.gridData[index].courses = this.utility.getKeyByValue(res['courses'], true)
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  onRowSelect(event: Event) {
    this.selectedrow = event;
    this.isRowSelected = true;
  }

  showModal(actionMode: string) {
    this.modalData = { actionMode: '', parent: '' }
    switch (actionMode) {
      case 'add': {
        this.modalData = {
          parent: 'students',
          title: 'Add new student',
          actionMode: actionMode,
          formFields: [
            { name: 'studentId', type: 'text', caption: 'Code', allowNull: false },
            { name: 'studentFName', type: 'text', caption: 'Name', allowNull: true },
            { name: 'studentLName', type: 'text', caption: 'Last Name', allowNull: false },
            { name: 'courses', type: 'checkbox', caption: 'Courses', value: this.courses, allowNull: false }
          ]
        }
        const modalRef = this.modal.open(ModalComponent);
        modalRef.componentInstance.modalData = this.modalData;
        break;
      }
      case 'edit': {
        this.modalData = {
          parent: 'students',
          title: 'Update student',
          actionMode: actionMode,
          formFields: [
            { name: 'studentId', type: 'text', caption: 'Code', allowNull: false },
            { name: 'studentFName', type: 'text', caption: 'Name', allowNull: true },
            { name: 'studentLName', type: 'text', caption: 'Last Name', allowNull: false },
            { name: 'courses', type: 'checkbox', caption: 'Courses', value: this.courses, allowNull: false }
          ],
          selectedRow: this.selectedrow
        }
        if (!this.modalData.selectedRow) {
          this.toast.error('Select an item to update first!')
        }
        else {
          const modalRef = this.modal.open(ModalComponent);
          modalRef.componentInstance.modalData = this.modalData;
        }
        break;
      }
      case 'delete': {
        this.modalData = {
          parent: 'students',
          title: 'Delete student',
          actionMode: actionMode,
          selectedRow: this.selectedrow
        }
        if (!this.modalData.selectedRow) {
          this.toast.error('Select an item to delete first!')
        }
        else {
          const modalRef = this.modal.open(ModalComponent);
          modalRef.componentInstance.modalData = this.modalData;
        }
      }

    }
  }

}