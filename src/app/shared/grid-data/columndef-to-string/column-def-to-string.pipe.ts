import {Pipe, PipeTransform} from '@angular/core';
import {GridDataColumn} from '../types/grid-data-column';

@Pipe({
  name: 'mcColumnDefToString',
  standalone: true,
})
export class ColumnDefToString implements PipeTransform {
  transform(value: GridDataColumn[], ...args: any[]): string[] {
    return value.map(columnDef => columnDef.columnDef);
  }
}
