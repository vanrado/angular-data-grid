import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPaginationComponent } from './grid-pagination.component';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {GRID_DATA_CONFIG} from '../grid-data.config';

interface MOCKED_ELEMENT {
  name: string;
}

describe('GridPaginationComponent', () => {
  let component: GridPaginationComponent<MOCKED_ELEMENT>;
  let fixture: ComponentFixture<GridPaginationComponent<MOCKED_ELEMENT>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, MatPaginatorModule, FormsModule, GridPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.pageSizeOptions).toEqual(GRID_DATA_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE_OPTIONS);
    expect(component.pageSize).toBe(GRID_DATA_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE);
    expect(component.length).toBe(0);
    expect(component.pageIndex).toBe(0);
  });

  it('should emit a page event when going to the next page', () => {
    spyOn(component.page, 'emit');
    component.init(100);
    component.nextPage();

    expect(component.page.emit).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 10,
      length: 0,
    });

  });

  it('should not emit a page event when there is no next page', () => {
    spyOn(component.page, 'emit');
    component.init(10);
    component.nextPage();

    expect(component.page.emit).not.toHaveBeenCalled();
  });

  it('should emit a page event when going to the previous page', () => {
    spyOn(component.page, 'emit');
    component.init(100);
    component.nextPage();
    expect(component.page.emit).toHaveBeenCalledWith({
      pageIndex: 1,
      pageSize: 10,
      length: 0,
    });
    component.previousPage();
    expect(component.page.emit).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 10,
      length: 0,
    });
  });

  it('should not emit a page event when there is no previous page', () => {
    spyOn(component.page, 'emit');
    component.init(100);
    component.previousPage();

    expect(component.page.emit).not.toHaveBeenCalled();
  });
});
