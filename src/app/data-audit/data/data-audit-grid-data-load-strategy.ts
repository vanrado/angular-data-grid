import {GridDataLoadStrategy} from '../../shared/grid-data/types/grid-data-load-strategy';
import {Observable} from 'rxjs';
import {DataAudit} from './data-audit';
import {DataAuditService} from './data-audit-api.service';

export class DataAuditGridDataLoadStrategy implements GridDataLoadStrategy<DataAudit> {
  constructor(private dataAuditService: DataAuditService) {
  }

  loadData(): Observable<DataAudit[]> {
    return this.dataAuditService.getDataAudits();
  }

}
