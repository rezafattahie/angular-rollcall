import { Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  holidays: string[] = [];
  isLoading: boolean = false;

  constructor(
    private basicDefinitionsService: BasicDefinitionsService
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
    this.isLoading = true;
    const holiday = { date: this.holidayViewCreator(date) };
    this.basicDefinitionsService.addNewItem(holiday, 'holidays').subscribe({
      next: () => {
        this.holidays.push(this.holidayViewCreator(date));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
    console.log('%cholidays.component.ts line:11 event', 'color: white; background-color: #007acc;', date);
  }

  holidayViewCreator(date: NgbDateStruct) {
    return `${date.year}/${date.month}/${date.day}`;

  }

}
