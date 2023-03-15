import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';
import { IModalData } from 'src/app/features/models/modal-data.interface';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { IStudents } from 'src/app/features/models/students.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class studentsComponent {

  @ViewChild('modalForm', { static: false }) modalForm?: TemplateRef<HTMLElement>;

  isLoading: boolean = false;
  modalData: IModalData = { actionMode: 'Add' };
  openedModal: any;
  gridData: any;
  courses: any;
  gridSettings: IGridSettings = { columns: {} };
  selectedRow: any
  classes: { [ket: string]: boolean } = {};
  isRowSelected: boolean = false;

  constructor(
    private modal: NgbModal,
    private basicDefinitionsService: BasicDefinitionsService,
    private utility: UtilityService,
    private toast: ToastrService
  ) { }

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
      'selected': this.isRowSelected,
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
    this.selectedRow = event;
    // this.isRowSelected = true;
  }

  showModal(actionMode: string) {
    if (actionMode === 'Edit' &&
      (!this.selectedRow || this.selectedRow === undefined)) {
      this.toast.error('Select an item to update first!');
    } else if (actionMode !== 'Delete') {
      this.modalData = { actionMode: '' }
      this.modalData = {
        title: actionMode === 'Add' ? 'Add New Student' : 'Update Student',
        actionMode: actionMode,
        formFields: [
          { name: 'studentId', type: 'textInput', caption: 'Code', allowNull: false },
          { name: 'studentFName', type: 'textInput', caption: 'Name', allowNull: true },
          { name: 'studentLName', type: 'textInput', caption: 'Last Name', allowNull: false },
          { name: 'courses', type: 'checkbox', caption: 'Courses', value: this.courses, allowNull: false }
        ],
        selectedRow: actionMode === 'Edit' ? this.selectedRow : ''
      }
      this.openedModal = this.modal.open(this.modalForm, { centered: true, size: 'lg' });
    }
    else {
      this.modalData = {
        actionMode: actionMode,
        title: 'Delete Student',
        formFields: [{
          name: '', type: 'text',
          caption: `You are about deleting ${this.selectedRow.studentFName} ${this.selectedRow.studentLName}. Are you sure?`,
          allowNull: true
        }],
        selectedRow: this.selectedRow
      }
      this.openedModal = this.modal.open(this.modalForm, { centered: false, size: 'lg' });
    }

  }

  submitModal(event: {}) {
    this.isLoading = true;
    switch (this.modalData.actionMode) {
      case 'Add': {
        this.basicDefinitionsService.addNewItem(event, 'students').subscribe({
          next: () => {
            this.gridData.push(event);
            this.closeModal();
            this.isLoading = false;
          },
          error: () => {
            this.closeModal();
            this.isLoading = false;
          }
        });
        break;
      }
      case 'Edit': {
        this.basicDefinitionsService.editItem(event, 'students', this.selectedRow.id).subscribe({
          next: () => {
            this.closeModal();
            this.isLoading = false;
          },
          error: () => {
            this.closeModal();
            this.isLoading = false;
          }
        });
        break;
      }
      case 'Delete': {
        this.basicDefinitionsService.delete('students', this.selectedRow.id).subscribe({
          next: () => {
            this.closeModal();
            this.isLoading = false;
          },
          error: () => {
            this.closeModal();
            this.isLoading = false;
          }
        });
        break;
      }
    }
    console.log('%cstudents.component.ts line:138 onSubmit', 'color: white; background-color: coral;', event);
  }

  closeModal() {
    this.openedModal.close();
  }

  cancelModal(event: boolean) {
    event && this.closeModal();
  }

}