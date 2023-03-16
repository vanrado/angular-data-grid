import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {GridDataColumn} from '../grid-data-column';

@Pipe({
  name: 'columnDefToString',
  standalone: true,
})
export class ColumnDefToString implements PipeTransform {
  transform(value: GridDataColumn[], ...args: any[]): string[] {
    return value.map(columnDef => columnDef.columnDef);
  }
}

@Component({
  selector: 'mc-grid-data',
  standalone: true,
  imports: [CommonModule, MatTableModule, ColumnDefToString],
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss'],
})
export class GridDataComponent {
  @Input() data: any | undefined;
  @Input() columns: GridDataColumn[] | undefined;
}

import {Pipe, PipeTransform} from '@angular/core';

