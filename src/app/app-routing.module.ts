import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {DataAuditComponent} from './data-audit/data-audit.component';
import {ConfigAuditComponent} from './config-audit/config-audit.component';
import {SandboxComponent} from './sandbox/sandbox.component';

const routes: Routes = [
  {path: 'sandbox', component: SandboxComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'data-audit', component: DataAuditComponent},
  {path: 'config-audit', component: ConfigAuditComponent},
  {path: '', redirectTo: '/sandbox', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
