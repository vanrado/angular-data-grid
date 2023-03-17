import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, delay, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    action: 'L',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    action: 'L',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    action: 'L',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    action: 'L',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    action: 'L',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    action: 'L',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    action: 'L',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    action: 'L',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    action: 'L',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    action: 'L',
  },
];

export class GridDataSource implements DataSource<any> {
  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public sort: MatSort | undefined;

  constructor() {
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    console.log('connect', this.sort);
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('datasource disconnect');
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData(): void {
    console.log('loadData', this.sort);
    this.loadingSubject.next(true);
    of(ELEMENT_DATA).pipe(
      delay(2000),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(products => {
      this.dataSubject.next(products);
    });
  }
}
