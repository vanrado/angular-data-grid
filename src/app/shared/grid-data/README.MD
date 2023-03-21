# GridDataComponent


The GridDataComponent is a reusable and highly configurable Angular component that provides an easy way to display tabular data with sorting, pagination, and selection capabilities. It leverages the power of Angular Material components to create a responsive and professional-looking data grid.

## Features
- Display data in a table format
- Column configuration with custom headers
- Built-in sorting using Angular Material's MatSort
- Pagination with the GridPaginationComponent
- Row selection with selectable input
- Customizable page size and page size options
- Responsive design

## Usage in template
```html
<mc-grid-data
  [columns]="columns"
  [dataSource]="dataSource"
  [selectable]="selectable"
  [selectedItems]="selectedItems"
  [pageable]="pageable"
  [pageSize]="pageSize"
  [pageSizeOptions]="pageSizeOptions"
  [page]="page"
  (selectedItemsChange)="onSelectedItemsChange($event)"
</mc-grid-data>
```

### Usage in TS
```typescript
this.gridDataSource = new GridDataSource(new SandboxGridDataLoadStrategy(sandboxApiService));
this.columns = [
  {columnDef: 'position', header: 'No.'},
  {columnDef: 'name', header: 'Name'},
  {columnDef: 'weight', header: 'Weight'},
  {columnDef: 'symbol', header: 'Symbol'},
  {columnDef: 'action', header: 'Action', cellTemplate: this.actionCell},
];
```

#### Example of loading strategy
```typescript
export class SandboxGridDataLoadStrategy implements GridDataLoadStrategy<PeriodicElement> {
  constructor(private sandboxApiService: SandboxApiService) {
  }

  loadData(): Observable<PeriodicElement[]> {
    return this.sandboxApiService.getData();
  }
}
```
