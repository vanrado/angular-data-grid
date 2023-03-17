import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxComponentComponent} from './sandbox-component/sandbox-component.component';
import {DocumentsComponent} from './documents/documents.component';

const routes: Routes = [
  { path: 'sandbox', component: SandboxComponentComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'data-audit', component: SandboxComponentComponent },
  { path: 'config-audit', component: SandboxComponentComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
