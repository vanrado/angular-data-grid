import {Observable} from 'rxjs';

export interface GridDataLoadStrategy<T> {
  loadData(): Observable<T[]>;
}
