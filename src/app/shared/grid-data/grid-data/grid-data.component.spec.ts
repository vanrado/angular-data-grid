import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {GridDataComponent} from './grid-data.component';
import {GridDataSource} from '../grid-data-source';
import {GridPaginationComponent} from '../grid-pagination/grid-pagination.component';
import {ColumnDefToString} from '../columndef-to-string/column-def-to-string.pipe';
import {of} from 'rxjs';

interface MOCKED_ELEMENT {
  name: string;
}

describe('GridDataComponent', () => {
  let component: GridDataComponent<MOCKED_ELEMENT>;
  let fixture: ComponentFixture<GridDataComponent<MOCKED_ELEMENT>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, BrowserAnimationsModule, GridDataComponent, GridPaginationComponent, ColumnDefToString],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDataComponent<MOCKED_ELEMENT>);
    component = fixture.componentInstance;
    component.columns = [
      {columnDef: 'id', header: 'ID'},
      {columnDef: 'name', header: 'Name'},
    ];
    component.dataSource = new GridDataSource<MOCKED_ELEMENT>({
      loadData: () => {
        return of([] as MOCKED_ELEMENT[]);
      },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should update the columns array when the selectable input is changed', () => {
    component.selectable = true;
    component.ngOnChanges({ selectable: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    fixture.detectChanges();

    const selectColumn = { columnDef: 'select', header: '' };
    expect(component.columns).toContain(selectColumn);

    component.selectable = false;
    component.ngOnChanges({ selectable: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } });
    fixture.detectChanges();

    expect(component.columns).not.toContain(selectColumn);
  });

  it('should update the selected items when a row is clicked', () => {
    const sampleData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    spyOn(component.selectedItemsChange, 'emit');
    component.dataSource!.data = sampleData;
    fixture.detectChanges();

    const row = sampleData[0];
    component.toggleSelection(row);
    expect(component.isRowSelected(row)).toBeTrue();
    expect(component.selectedItemsChange.emit).toHaveBeenCalledWith([row]);

    component.toggleSelection(row);
    expect(component.isRowSelected(row)).toBeFalse();
    expect(component.selectedItemsChange.emit).toHaveBeenCalledWith([]);
  });
});
