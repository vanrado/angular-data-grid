import {GridDataLoadStrategy} from '../../shared/grid-data/grid-data-load-strategy';
import {Observable} from 'rxjs';
import {ConfigAudit} from './config-audit';
import {ConfigAuditService} from './data-audit-api.service';

export class ConfigAuditGridDataLoadStrategy implements GridDataLoadStrategy<ConfigAudit> {
  constructor(private configAuditService: ConfigAuditService) {
  }

  loadData(): Observable<ConfigAudit[]> {
    return this.configAuditService.getConfigAudits();
  }

}
