import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IModalData } from 'src/app/features/models/modal-data.interface';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  animations: [
    trigger('holidayList', [
      state('current', style({
        opacity: 1,
        transform: 'translateY(0)',
        // scale: 1
      })),
      transition('void => *', [
        style({
          opacity: 0,
          // scale: 0,
          transform: 'translateY(100px)'
        }), animate(300)
      ]),
      transition('* => void', animate(300, style({
        opacity: 0,
        // scale: 0,
        transform: 'translateX(300px)'
      })))
    ])
  ]
})
export class HolidaysComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) modalForm?: TemplateRef<HTMLElement>;

  modalData: IModalData = { actionMode: 'Delete' };
  openedModal: any;
  holidays: string[] = [];
  isLoading: boolean = false;

  constructor(
    private basicDefinitionsService: BasicDefinitionsService,
    private toast: ToastrService,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this.getAllHolidays();
  }

  getAllHolidays() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('holidays').subscribe({
      next: (result) => {
        result.forEach((res: { date: string, id: number }) => {
          this.holidays.push(res.date)
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  onAddHoliday(date: NgbDateStruct) {
    if (!date) {
      this.toast.error('Select a date!')
    }
    this.isLoading = true;
    const holiday = { date: this.holidayViewCreator(date) };
    this.basicDefinitionsService.addNewItem(holiday, 'holidays').subscribe({
      next: () => {
        this.holidays.push(this.holidayViewCreator(date));
        this.toast.success(this.holidayViewCreator(date) + ' added to holidays.')
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
    console.log('%cholidays.component.ts line:11 event', 'color: white; background-color: #007acc;', date);
  }

  removeHoliday(holiday: string) {
    // this.modalData = {
    //   actionMode: 'Delete',
    //   title: 'Delete Holiday',
    //   formFields: [{
    //     name: '', type: 'text',
    //     caption: `You are about deleting ${holiday} from holidays. Are you sure?`,
    //     allowNull: true
    //   }],
    // }
    // this.openedModal = this.modal.open(this.modalForm, { centered: false, size: 'lg' });
    this.isLoading = true;
    let foundHoliday: { date: string, id: number } = { date: '', id: 0 };
    this.basicDefinitionsService.getAll('holidays').subscribe({
      next: (result) => {
        foundHoliday = result.find((hd: { date: string, id: number }) => {
          return hd.date === holiday
        })
        this.basicDefinitionsService.delete('holidays', foundHoliday.id).subscribe({
          next: () => {
            this.holidays = this.holidays.filter(val => {
              return val !== holiday
            })
          }
        })
      }
    })

  }

  holidayViewCreator(date: NgbDateStruct) {
    return `${date.year}/${date.month}/${date.day}`;
  }

}
