import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SandboxComponentComponent} from './sandbox-component/sandbox-component.component';

const routes: Routes = [
  { path: 'documents', component: SandboxComponentComponent },
  { path: 'data-audit', component: SandboxComponentComponent },
  { path: 'config-audit', component: SandboxComponentComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
