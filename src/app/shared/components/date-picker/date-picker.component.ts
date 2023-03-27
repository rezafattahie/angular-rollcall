import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  @Output() onHolidaySelect = new EventEmitter<NgbDateStruct>();

  selectedDate: NgbDateStruct | undefined;
  date: { year: number; month: number; } | undefined;

  constructor(private calendar: NgbCalendar) { }

  // isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
  // isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  setAsHoliday() {
    this.onHolidaySelect.emit(this.selectedDate)
    debugger
  }
}
