import { Component, EventEmitter, Input, Output, SimpleChanges, } from '@angular/core';

import { IGridSettings } from '../../models/grid-settings.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() dataSource = [];
  @Input() settings: IGridSettings = { columns: {} };
  @Output() selectedRow = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
    }
  }

  ngOnInit(): void {

  }

  rowSelect(row: any) {
    this.selectedRow.emit(row.data);
  }

}
