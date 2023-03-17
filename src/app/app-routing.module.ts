import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxComponentComponent} from './sandbox-component/sandbox-component.component';
import {DocumentsComponent} from './documents/documents.component';
import {DataAuditComponent} from './data-audit/data-audit.component';
import {ConfigAuditComponent} from './config-audit/config-audit.component';

const routes: Routes = [
  {path: 'sandbox', component: SandboxComponentComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'data-audit', component: DataAuditComponent},
  {path: 'config-audit', component: ConfigAuditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
