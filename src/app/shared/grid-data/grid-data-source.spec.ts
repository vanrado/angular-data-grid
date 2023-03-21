import { TestBed } from '@angular/core/testing';
import { GridDataSource } from './grid-data-source';
import { GridDataLoadStrategy } from './types/grid-data-load-strategy';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import {of, Subscription, take} from 'rxjs';

interface MOCKED_ELEMENT {
  id: number,
  name: string;
}
describe('GridDataSource', () => {
  let dataSource: GridDataSource<MOCKED_ELEMENT>;
  let dataLoadStrategy: GridDataLoadStrategy<MOCKED_ELEMENT>;
  let subscription: Subscription;

  beforeEach(() => {
    dataLoadStrategy = {
      loadData: () => of([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }])
    };

    TestBed.configureTestingModule({
      providers: [GridPaginationComponent]
    });

    dataSource = new GridDataSource(dataLoadStrategy);
  });

  // Unsubscribe the active observer after the test is complete
  afterEach(() => {
    if (subscription) {
      subscription.unsubscribe();
    }
  });

  it('should create', () => {
    expect(dataSource).toBeTruthy();
  });

  it('should load data', (done) => {
    dataSource.loadData();
    dataSource.connect().pipe(take(1)).subscribe((data) => {
      expect(data).toEqual([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
      done();
    });
  });

  it('should apply and reset filter', () => {
    // no filter
    expect(dataSource.getCurrentFilter()).toEqual('');

    // add some simple filter
    dataSource.applyFilter('john', 'name');
    expect(dataSource.getCurrentFilter()).toBeTruthy();

    dataSource.resetFilter();
    expect(dataSource.getCurrentFilter()).toEqual('');
  });

  it('should have loading$ BehaviorSubject', (done) => {
    subscription = dataSource.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
      done();
    });
  });

  it('should have getPagedData method', (done) => {
    dataSource.loadData();
    subscription = dataSource.connect().subscribe(() => {
      dataSource._pageData(dataSource.data);
      expect(dataSource.getPagedData()).toEqual([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
      done();
    });
  });

});
