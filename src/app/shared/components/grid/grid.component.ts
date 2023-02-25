import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() dataSource = [];

  @Output() selectedRow = new EventEmitter<any>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];
  clickedRows = new Array();

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource) {
      this.displayedColumns = Object.keys(this.dataSource[0])
    }
  }
  ngOnInit(): void {

  }

  salam(row:any) {
    this.clickedRows = new Array();
    this.clickedRows.push(row);
    this.selectedRow.emit(this.clickedRows)
    console.log('%cgrid.component.ts line:35 this.clickedRows', 'color: white; background-color: #26bfa5;', this.clickedRows);
  }

}
