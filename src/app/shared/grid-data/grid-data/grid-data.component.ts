import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {GridDataColumn} from '../types/grid-data-column';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {GridDataSource} from '../grid-data-source';
import {GridDataSelectionModel} from '../types/grid-data-selection-model';
import {GridPaginationComponent} from '../grid-pagination/grid-pagination.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'mc-grid-data',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, GridPaginationComponent, MatPaginatorModule, FormsModule],
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss'],
})
export class GridDataComponent<T> implements AfterViewInit, OnInit, OnChanges {

  @Input() columns: GridDataColumn[] | undefined;
  @Input() dataSource: GridDataSource<T> | null = null;
  @Input() selectable: boolean = false;
  @Input() selectedItems: T[] = [];
  @Input() pageable: boolean = false;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() page: number = 5;
  @Output() selectedItemsChange = new EventEmitter<T[]>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(GridPaginationComponent) paginator: GridPaginationComponent<T> | undefined;
  isAllSelected: boolean = false;
  columnsDefs: string[] = [];
  private selectionModel: GridDataSelectionModel<T> = new GridDataSelectionModel(true, [] as T[]);

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectable']) {
      this.updateSelectColumn();
    }

    if (changes['columns']) {
      this.updateTransformedColumns();
    }
  }

  ngOnInit(): void {
    if (this.dataSource) {
      this.dataSource.loadData();
    }
  }

  announceSortChange(event: any) {
    // do some logic if necessary
  }

  public toggleSelection(row: T): void {
    this.isAllSelected = false;
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

    if (!this.isAllSelected) {
      this.selectionModel.clearSelection();
    } else {
      this.selectionModel.selectAll(this.dataSource.paginator ? this.dataSource.getPagedData() : this.dataSource.data);
    }

    this.selectedItemsChange.emit(this.selectionModel.selected);
  }

  onPageChanged(): void {
    this.isAllSelected = false;
  }

  private updateTransformedColumns(): void {
    if (this.columns) {
      this.columnsDefs = this.columns.map(column => column.columnDef);
    }
  }

  /*
   * Update the columns array in the component class to include the select column only when the selectable input is set to true.
   */
  private updateSelectColumn(): void {
    if (!this.columns) {
      return;
    }

    const selectColumn: GridDataColumn = { columnDef: 'select', header: ''};

    if (this.selectable) {
      if (!this.columns.some(column => column.columnDef === 'select')) {
        this.columns.unshift(selectColumn);
      }
    } else {
      this.columns = this.columns.filter(column => column.columnDef !== 'select');
    }
  }
}

