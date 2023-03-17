import {AfterViewInit, Component, Input, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {GridDataColumn} from '../grid-data-column';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {GridDataSource2} from '../grid-data-source2';

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
  imports: [CommonModule, MatTableModule, ColumnDefToString, MatSortModule],
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss'],
})
export class GridDataComponent implements AfterViewInit, OnInit {
  @Input() columns: GridDataColumn[] | undefined;
  @Input() dataSource: GridDataSource2 | null = null;
  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(event: any) {
    console.log('$event', event);
  }

  ngAfterViewInit(): void {
    console.log('GridDataComponent ngAfterViewInit');
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }

  }

  onClick($event: MouseEvent) {
    console.log('sort', this.sort);
  }

  ngOnInit(): void {
    if (this.dataSource) {
      this.dataSource.loadData()
    }
  }
}

