import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridDataComponent} from '../shared/grid-data/grid-data/grid-data.component';
import {GridDataSource} from '../shared/grid-data/grid-data-source';
import {Document} from './data/document';
import {DocumentService} from './data/documents-api.service';
import {DocumentsGridDataLoadStrategy} from './data/documents-grid-data-load-strategy';
import {GridDataColumn} from '../shared/grid-data/types/grid-data-column';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, GridDataComponent],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  gridDataSource: GridDataSource<Document>;
  columns: GridDataColumn[];

  constructor(private documentsService: DocumentService) {
    this.gridDataSource = new GridDataSource<Document>(new DocumentsGridDataLoadStrategy(documentsService));
    this.columns = [
      {
        columnDef: 'title', header: 'Title'
      },
      {
        columnDef: 'author', header: 'Author'
      },
      {
        columnDef: 'date', header: 'Date'
      },
    ];
  }

  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.gridDataSource.applyFilter(value, column);
  }


  onClick() {

  }
}
