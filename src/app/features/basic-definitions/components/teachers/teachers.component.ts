import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UtilityService } from 'src/app/core/services/utility.service';
import { IModalData } from 'src/app/features/models/modal-data.interface';
import { ITeachers } from 'src/app/features/models/teachers.interface';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) modalForm?: TemplateRef<HTMLElement>;

  gridData: any;
  gridSettings: IGridSettings = { columns: {} };
  isLoading: boolean = false;
  modalData: IModalData = { actionMode: 'Add' };
  openedModal: any;
  courses: any;
  selectedRow: any

  constructor(
    private modal: NgbModal,
    private basicDefinitionsService: BasicDefinitionsService,
    private utility: UtilityService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.gridSettings = {
      columns: {
        "code": { title: 'Code' },
        "name": { title: 'Name' },
        "courses": { title: 'Courses' }
      }
    }
    this.getAllTeachers();
    this.getAllCources();
  }

  getAllCources() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('courses').subscribe(result => {
      this.courses = result;
      this.isLoading = false;
    })
  }

  getAllTeachers() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('teachers').subscribe({
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
        title: actionMode === 'Add' ? 'Add New Teacher' : 'Update Teacher',
        actionMode: actionMode,
        formFields: [
          { name: 'code', type: 'textInput', caption: 'Code', allowNull: false },
          { name: 'name', type: 'textInput', caption: 'Name', allowNull: false },
          {
            name: 'username',
            type: actionMode === 'Edit' ? 'textInput' : '',
            caption: actionMode === 'Edit' ? 'Login User Name' : '',
            allowNull: actionMode === 'Add' ? true : false
          },
          {
            name: 'password',
            type: actionMode === 'Edit' ? 'textInput' : '',
            caption: actionMode === 'Edit' ? 'Login Password' : '',
            allowNull: actionMode === 'Add' ? true : false
          },
          {
            name: 'imageUrl',
            type: actionMode === 'Edit' ? 'image' : '',
            caption: actionMode === 'Edit' ? 'Image' : '',
            allowNull: true
          },
          { name: 'courses', type: 'checkbox', caption: 'Courses', value: this.courses, allowNull: false },

        ],
        selectedRow: actionMode === 'Edit' ? this.selectedRow : ''
      }
      this.openedModal = this.modal.open(this.modalForm, { centered: true, size: 'lg' });
    }
    else {
      this.modalData = {
        actionMode: actionMode,
        title: 'Delete Teacher',
        formFields: [{
          name: '', type: 'text',
          caption: `You are about deleting ${this.selectedRow.name}. Are you sure?`,
          allowNull: true
        }],
        selectedRow: this.selectedRow
      }
      this.openedModal = this.modal.open(this.modalForm, { centered: false, size: 'lg' });
    }

  }

  submitModal(event: any) {
    this.isLoading = true;
    switch (this.modalData.actionMode) {
      case 'Add': {
        event.username = event.name;
        event.password = event.code;
        event.imageUrl = '';
        this.basicDefinitionsService.addNewItem(event, 'teachers').subscribe({
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
        this.basicDefinitionsService.editItem(event, 'teachers', this.selectedRow.id).subscribe({
          next: () => {
            debugger
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
        this.basicDefinitionsService.delete('teachers', this.selectedRow.id).subscribe({
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
