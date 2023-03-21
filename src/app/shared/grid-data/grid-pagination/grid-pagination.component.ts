import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatTableDataSourcePaginator} from '@angular/material/table';
import {Subject} from 'rxjs';
import {GRID_DATA_CONFIG} from '../grid-data.config';

@Component({
  selector: 'mc-grid-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  templateUrl: './grid-pagination.component.html',
})export class GridPaginationComponent<T> implements MatTableDataSourcePaginator {
  @Input() pageSizeOptions: number[] = GRID_DATA_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE_OPTIONS;
  @Input() pageSize = GRID_DATA_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;
  @Input() length = 0;
  @Input() pageIndex = 0;
  @Output() page = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  initialized: Subject<void> = new Subject();
  totalPages: number = 0;
  private totalLength: number = 0;

  public nextPage(): void {
    if (this.hasNextPage()) {
      this.pageIndex++;
      this.emitPageEvent();
    }
  }

  public hasNextPage(): boolean {
    return this.pageIndex < this.totalPages - 1;
  }

  public previousPage(): void {
    if (this.hasPreviousPage()) {
      this.pageIndex--;
      this.emitPageEvent();
    }
  }

  public hasPreviousPage(): boolean {
    return this.pageIndex > 0;
  }

  public firstPage(): void {
    this.pageIndex = 0;
    this.emitPageEvent();
  }

  public lastPage(): void {
    this.pageIndex = this.totalPages - 1;
    this.emitPageEvent();
  }

  public emitPageEvent(): void {
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }

  public onChangePageSize(): void {
    this.setTotalPages();
    this.firstPage();
  }

  public init(totalLength: number): void {
    this.totalLength = totalLength;
    this.setTotalPages();
    this.initialized.next();
  }

  private setTotalPages(): void {
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
  }
}
