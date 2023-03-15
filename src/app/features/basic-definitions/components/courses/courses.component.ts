import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UtilityService } from 'src/app/core/services/utility.service';
import { IModalData } from 'src/app/features/models/modal-data.interface';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

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
      }
    }
    this.getAllCourses();
  }

  getAllCourses() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('courses').subscribe({
      next: (result: any) => {
        this.gridData = result;
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
        title: actionMode === 'Add' ? 'Add New Course' : 'Update Course',
        actionMode: actionMode,
        formFields: [
          { name: 'code', type: 'textInput', caption: 'Code', allowNull: false },
          { name: 'name', type: 'textInput', caption: 'Name', allowNull: false }
        ],
        selectedRow: actionMode === 'Edit' ? this.selectedRow : ''
      }
      this.openedModal = this.modal.open(this.modalForm, { centered: true, size: 'lg' });
    }
    else {
      this.modalData = {
        actionMode: actionMode,
        title: 'Delete Course',
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
        this.basicDefinitionsService.addNewItem(event, 'courses').subscribe({
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
        this.basicDefinitionsService.editItem(event, 'courses', this.selectedRow.id).subscribe({
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
        this.basicDefinitionsService.delete('courses', this.selectedRow.id).subscribe({
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
