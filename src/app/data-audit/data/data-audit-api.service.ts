// Data audit API service
import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {DATA_AUDITS} from './mocks';
import {DataAudit} from './data-audit';

@Injectable({
  providedIn: 'root'
})
export class DataAuditService {

  getDataAudits(): Observable<DataAudit[]> {
    return of(DATA_AUDITS).pipe(delay(1500));
  }
}
