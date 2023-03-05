import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { IGridSettings } from '../../models/grid-settings.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() dataSource = [];
  @Input() settings: IGridSettings = { columns: {} };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
    }
  }

  ngOnInit(): void {

  }

  rowSelect(row: any) {

  }

}
