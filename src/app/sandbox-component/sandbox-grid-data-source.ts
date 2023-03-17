import {GridDataSource2} from '../shared/grid-data/grid-data-source2';
import {Observable} from 'rxjs';
import {SandboxApiService} from './sandbox-api.service';

export class SandboxGridDataSource extends GridDataSource2 {
  constructor(private sandboxApiService: SandboxApiService) {
    super();
  }

  protected getData(): Observable<any[]> {
    return this.sandboxApiService.getData();
  }
}
