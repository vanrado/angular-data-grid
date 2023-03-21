import {GridDataLoadStrategy} from '../../shared/grid-data/types/grid-data-load-strategy';
import {SandboxApiService} from './sandbox-api.service';
import {Observable} from 'rxjs';
import {PeriodicElement} from './periodic-element';

export class SandboxGridDataLoadStrategy implements GridDataLoadStrategy<PeriodicElement> {
  constructor(private sandboxApiService: SandboxApiService) {
  }

  loadData(): Observable<PeriodicElement[]> {
    return this.sandboxApiService.getData();
  }

}
