import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';
import {CommonModule} from '@angular/common';
import {GridDataColumn} from '../shared/grid-data/types/grid-data-column';
import {GridDataSource} from '../shared/grid-data/grid-data-source';
import {SandboxApiService} from './data/sandbox-api.service';
import {SandboxGridDataLoadStrategy} from './data/sandbox-grid-data-load-strategy';
import {PeriodicElement} from './data/periodic-element';
import {GridPaginationComponent} from '../shared/grid-data/grid-pagination/grid-pagination.component';

@Component({
  standalone: true,
  selector: 'app-sandbox-component',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  imports: [CommonModule, GridDataComponent, GridPaginationComponent],
})
export class SandboxComponent implements OnInit {
  @ViewChild('actionCell', {static: true}) actionCell!: TemplateRef<any>;
  gridDataSource: GridDataSource<PeriodicElement>;
  columns: GridDataColumn[] | undefined;
  selectedItems: PeriodicElement[] = [];

  constructor(private sandboxApiService: SandboxApiService) {
    this.gridDataSource = new GridDataSource(new SandboxGridDataLoadStrategy(sandboxApiService));
  }

  ngOnInit(): void {
    this.columns = [
      {columnDef: 'position', header: 'No.'},
      {columnDef: 'name', header: 'Name'},
      {columnDef: 'weight', header: 'Weight'},
      {columnDef: 'symbol', header: 'Symbol'},
      {columnDef: 'action', header: 'Action', cellTemplate: this.actionCell},
    ];
  }

  doAction(element: any): void {
    console.log('element', element);
  }

  onClick() {
    this.gridDataSource?.loadData();
    this.gridDataSource.resetFilter();
  }

  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.gridDataSource.applyFilter(value, column);
  }

  onSelectedItemsChange(event: PeriodicElement[]) {
    console.log('onSelectedItemsChange', {event, selectedItems: this.selectedItems});
  }
}
