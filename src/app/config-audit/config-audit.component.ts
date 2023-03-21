import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDataSource} from '../shared/grid-data/grid-data-source';
import {ConfigAudit} from './data/config-audit';
import {GridDataColumn} from '../shared/grid-data/types/grid-data-column';
import {ConfigAuditService} from './data/data-audit-api.service';
import {ConfigAuditGridDataLoadStrategy} from './data/config-audit-grid-data-load-strategy';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';

@Component({
  selector: 'app-data-audit',
  standalone: true,
  imports: [CommonModule, GridDataComponent],
  templateUrl: './config-audit.component.html',
  styleUrls: ['./config-audit.component.scss']
})
export class ConfigAuditComponent {
  gridDataSource: GridDataSource<ConfigAudit>;
  columns: GridDataColumn[];

  constructor(private dataAuditService: ConfigAuditService) {
    this.gridDataSource = new GridDataSource<ConfigAudit>(new ConfigAuditGridDataLoadStrategy(dataAuditService));
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
