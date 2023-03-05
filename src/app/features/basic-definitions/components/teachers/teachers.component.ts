import { Component, OnInit } from '@angular/core';
import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  gridData: any;
  gridSettings: IGridSettings = { columns: {} };
  isLoading: boolean = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.gridSettings = {
      columns: {
        "code": { title: 'Code' },
        "name": { title: 'Name' },
        "courses": { title: 'Courses' }
      }
    }
    this.isLoading = true;
    this.api.get('teachers').subscribe((result) => {
      this.gridData = result;
      this.isLoading = false;
    })
  }

}
