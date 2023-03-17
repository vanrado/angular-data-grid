// Data audit API service
import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {CONFIG_AUDITS} from './mocks';
import {ConfigAudit} from './config-audit';

@Injectable({
  providedIn: 'root'
})
export class ConfigAuditService {

  getConfigAudits(): Observable<ConfigAudit[]> {
    return of(CONFIG_AUDITS).pipe(delay(1500));
  }
}
