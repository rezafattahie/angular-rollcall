import { Component, OnInit } from '@angular/core';

import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';

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
    private BasicDefinitionsService: BasicDefinitionsService
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
    this.BasicDefinitionsService.getAll('teachers').subscribe((result) => {
      this.gridData = result;
      this.isLoading = false;
    })
  }

}
