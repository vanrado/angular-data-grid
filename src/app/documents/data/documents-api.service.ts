import { Injectable } from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import { Document } from './document';
import {DOCUMENTS} from './mocks';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() {
  }

  getDocuments(): Observable<Document[]> {
    return of(DOCUMENTS).pipe(delay(1500));
  }

}
