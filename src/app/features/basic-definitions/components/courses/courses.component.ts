import { Component } from '@angular/core';

import { IGridSettings } from 'src/app/shared/models/grid-settings.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { BasicDefinitionsService } from '../../services/basic-definitions.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  gridData: any;
  gridSettings: IGridSettings = { columns: {} };
  isLoading: boolean = false;

  constructor(
    private basicDefinitionsService: BasicDefinitionsService
  ) { }

  ngOnInit(): void {
    this.gridSettings = {
      columns: {
        "id": { title: 'Code' },
        "name": { title: 'Name' },
      }
    }
    this.getAllCourses();
  }

  getAllCourses() {
    this.isLoading = true;
    this.basicDefinitionsService.getAll('courses').subscribe((result) => {
      this.gridData = result;
      this.isLoading = false;
    })
  }

}
