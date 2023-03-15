import { Component, EventEmitter, Input, Output, SimpleChanges, } from '@angular/core';

import { IGridSettings } from '../../models/grid-settings.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() dataSource: any = [];
  @Input() settings: IGridSettings = { columns: {} };
  @Output() selectedRow = new EventEmitter();

  gridData: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.gridData = this.dataSource;
    }
  }

  ngOnInit(): void {

  }

  rowSelect(row: any) {
    this.selectedRow.emit(row.data);
  }

}
