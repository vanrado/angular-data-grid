import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatTableDataSourcePaginator} from '@angular/material/table';
import {Subject} from 'rxjs';

@Component({
  selector: 'mc-grid-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  template: `
    <div class="paginator-container">
      <button class="paginator-button" (click)="firstPage()" [disabled]="!hasPreviousPage()">
        first_page
      </button>
      <button class="paginator-button" (click)="previousPage()" [disabled]="!hasPreviousPage()">
        chevron_left
      </button>
      <span class="paginator-info">{{ pageIndex + 1 }} / {{ totalPages }}</span>
      <button class="paginator-button" (click)="nextPage()" [disabled]="!hasNextPage()">
        chevron_right
      </button>
      <button class="paginator-button" (click)="lastPage()" [disabled]="!hasNextPage()">
        last_page
      </button>
      <div class="page-size-select">
        <select [(ngModel)]="pageSize" (ngModelChange)="onChangePageSize()">
          <option *ngFor="let option of pageSizeOptions" [ngValue]="option">{{option}}</option>
        </select>
      </div>
    </div>
  `
})export class GridPaginationComponent<T> implements MatTableDataSourcePaginator {
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  @Input() pageSize = 10;
  @Input() length = 0;
  @Input() pageIndex = 0;
  @Output() page = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  initialized: Subject<void> = new Subject();
  totalPages: number = 0;
  private totalLength: number = 0;

  constructor() {}

  ngOnInit() {
  }

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
