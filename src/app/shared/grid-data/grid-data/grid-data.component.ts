import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {GridDataColumn} from '../grid-data-column';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {GridDataSource} from '../grid-data-source';
import {GridDataSelectionModel} from '../grid-data-selection-model';

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
export class GridDataComponent<T> implements AfterViewInit, OnInit {
  @Input() columns: GridDataColumn[] | undefined;
  @Input() dataSource: GridDataSource<T> | null = null;
  @Input() selectable: boolean = false;
  @Input() selectedItems: T[] = [];
  @Output() selectedItemsChange = new EventEmitter<T[]>();
  @ViewChild(MatSort) sort!: MatSort;
  private selectionModel: GridDataSelectionModel<T> = new GridDataSelectionModel(true, [] as T[]);

  announceSortChange(event: any) {
    console.log('$event', event);
  }

  ngAfterViewInit(): void {
    console.log('GridDataComponent ngAfterViewInit');
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    if (this.dataSource) {
      this.dataSource.loadData();
    }
  }

  public toggleSelection(row: T): void {
    this.selectionModel.toggle(row);
    this.selectedItemsChange.emit(this.selectionModel.selected);
  }

  isRowSelected(row: T): boolean {
    return this.selectionModel.isSelected(row);
  }

  toggleAllSelection(): void {
    if (!this.dataSource?.data) {
      return;
    }

    if (this.isAllSelected()) {
      this.selectionModel.clearSelection();
    } else {
      this.selectionModel.selectAll(this.dataSource.data);
    }

    this.selectedItemsChange.emit(this.selectionModel.selected);
  }

  isAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource?.data.length || 0;
    return numSelected === numRows;
    /*
    isAllSelected(): boolean {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource?.data.length || 0;
      const pageStart = this.dataSource?.paginator?.pageIndex * (this.dataSource?.paginator?.pageSize || 0) || 0;
      const pageEnd = pageStart + (this.dataSource?.paginator?.pageSize || 0);
      const numVisibleRows = Math.min(numRows, pageEnd) - pageStart;
      return numSelected === numVisibleRows && numVisibleRows > 0;
    }
     */
  }
}

