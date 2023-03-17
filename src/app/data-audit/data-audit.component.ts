import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDataSource} from '../shared/grid-data/grid-data-source';
import {DataAudit} from './data/data-audit';
import {GridDataColumn} from '../shared/grid-data/grid-data-column';
import {DataAuditService} from './data/data-audit-api.service';
import {DataAuditGridDataLoadStrategy} from './data/data-audit-grid-data-load-strategy';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';

@Component({
  selector: 'app-data-audit',
  standalone: true,
  imports: [CommonModule, GridDataComponent],
  templateUrl: './data-audit.component.html',
  styleUrls: ['./data-audit.component.scss']
})
export class DataAuditComponent {
  gridDataSource: GridDataSource<DataAudit>;
  columns: GridDataColumn[];

  constructor(private dataAuditService: DataAuditService) {
    this.gridDataSource = new GridDataSource<DataAudit>(new DataAuditGridDataLoadStrategy(dataAuditService));
    this.columns = [
      {
        columnDef: 'user', header: 'User'
      },
      {
        columnDef: 'action', header: 'Action'
      },
      {
        columnDef: 'timestamp', header: 'Date'
      },
    ];
  }

  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.gridDataSource.applyFilter(value, column);
  }

  onClick() {
    this.gridDataSource?.loadData();
    this.gridDataSource.resetFilter();
  }
}
