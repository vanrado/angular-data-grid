import {GridDataLoadStrategy} from '../../shared/grid-data/grid-data-load-strategy';
import {Observable} from 'rxjs';
import {Document} from './document';
import {DocumentService} from './documents-api.service';

export class DocumentsGridDataLoadStrategy implements GridDataLoadStrategy<Document> {
  constructor(private sandboxApiService: DocumentService) {
  }

  loadData(): Observable<Document[]> {
    return this.sandboxApiService.getDocuments();
  }

}
