import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';
import {CommonModule} from '@angular/common';
import {GridDataColumn} from '../shared/grid-data/grid-data-column';
import {GridDataSource2} from '../shared/grid-data/grid-data-source2';
import {SandboxGridDataSource} from './sandbox-grid-data-source';
import {SandboxApiService} from './sandbox-api.service';

@Component({
  standalone: true,
  selector: 'app-sandbox-component',
  templateUrl: './sandbox-component.component.html',
  styleUrls: ['./sandbox-component.component.scss'],
  imports: [CommonModule, GridDataComponent],
})
export class SandboxComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('actionCell', {static: true}) actionCell!: TemplateRef<any>;
  gridDataSource: GridDataSource2;
  columns: GridDataColumn[] | undefined;

  constructor(sandboxApiService: SandboxApiService) {
    this.gridDataSource = new SandboxGridDataSource(sandboxApiService);
  }

  ngOnInit(): void {
    this.columns = [
      {columnDef: 'position', header: 'No.'},
      {columnDef: 'name', header: 'Name'},
      {columnDef: 'weight', header: 'Weight'},
      {columnDef: 'symbol', header: 'Symbol'},
      {columnDef: 'action', header: 'Action', cellTemplate: this.actionCell},
    ];
    console.log('ngOnInit', this.columns);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.columns);
  }

  doAction(element: any): void {
    console.log('element', element);
  }

  onClick($event: MouseEvent) {
    this.gridDataSource?.loadData();
    this.gridDataSource.resetFilter();
  }

  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.gridDataSource.applyFilter(value, column);
  }
}
