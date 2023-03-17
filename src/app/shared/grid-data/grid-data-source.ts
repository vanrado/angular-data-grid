import {BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {GridDataLoadStrategy} from './grid-data-load-strategy';

export class GridDataSource<T> extends MatTableDataSource<T> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private gridDataFilter: { [key: string]: string } = {};
  private dataLoadStrategy: GridDataLoadStrategy<T>;
  public loading$ = this.loadingSubject.asObservable();

  constructor(dataLoadStrategy: GridDataLoadStrategy<T>) {
    super();
    this.filterPredicate = this.multipleCustomFilter;
    this.dataLoadStrategy = dataLoadStrategy;
  }

  override connect(): BehaviorSubject<any[]> {
    return super.connect();
  }

  override disconnect() {
    super.disconnect();
  }

  /*
 * Override
 * Custom implementation of filter matching. Support for one or multiple criteria.
 * Checks if a data object matches the data source's filter string.
 * By default, each data object is converted to a string of its properties and returns
 * true if the filter has at least one occurrence in that string. By default,
 * the filter string has its whitespace trimmed and the match is case-insensitive.
 */
  protected multipleCustomFilter = (rowData: any, filter: string): boolean => {
    let searchTerms: Record<string, string> = JSON.parse(filter);
    let isMatch = true;
    for (const [key, value] of Object.entries(searchTerms)) {
      if (value && String(rowData[key]).toLowerCase().indexOf(value) === -1) {
        isMatch = false;
        break;
      }

    }
    return isMatch;
  }

  public loadData(): void {
    this.loadingSubject.next(true);
    this.dataLoadStrategy.loadData()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  public applyFilter(value: string, column: string): void {
    this.gridDataFilter[column] = value.trim().toLowerCase();
    this.filter = JSON.stringify(this.gridDataFilter);
  }

  public resetFilter(): void {
    this.gridDataFilter = {};
    this.filter = JSON.stringify(this.gridDataFilter);
  }
}
