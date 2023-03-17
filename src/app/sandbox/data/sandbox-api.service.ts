import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {ELEMENT_DATA} from './mocks';
import {PeriodicElement} from './periodic-element';

@Injectable({ providedIn: 'root' })
export class SandboxApiService {
  public getData(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
