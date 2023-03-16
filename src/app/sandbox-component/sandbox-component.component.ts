import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';
import {Observable, of} from 'rxjs';
import {CommonModule} from '@angular/common';
import {GridDataColumn} from '../shared/grid-data/grid-data-column';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Observable<PeriodicElement[]> = of([
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
]);

@Component({
  standalone: true,
  selector: 'app-sandbox-component',
  templateUrl: './sandbox-component.component.html',
  styleUrls: ['./sandbox-component.component.scss'],
  imports: [CommonModule, GridDataComponent],
})
export class SandboxComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('actionCell', {static: true}) actionCell!: TemplateRef<any>;

  data$ = ELEMENT_DATA;
  columns: GridDataColumn[] | undefined;

  ngOnInit(): void {
    this.columns = [
      {columnDef: 'position', header: 'No.'},
      {columnDef: 'name', header: 'Name'},
      {columnDef: 'weight', header: 'Weight'},
      {columnDef: 'symbol', header: 'Symbol'},
      {columnDef: 'action', header: 'Action', cellTemplate: this.actionCell},
    ];
    console.log('ngOnInit', this.columns);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.columns);
  }

  doAction(element: any): void {
    console.log('element', element);
  }
}
