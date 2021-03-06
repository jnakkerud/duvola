import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { GeneratedFormComponent, FormCompleteComponent } from './generated-form/generated-form.component';
import { DynamicTableTestComponent } from './dynamic-form-test/table/dynamic-table-test.component';
import { DynamicFormTestComponent } from './dynamic-form-test/form/dynamic-form-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'collections', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // TODO lazy load Module
  { path: 'test-table', component: DynamicTableTestComponent},
  { path: 'test-form/:id', component: DynamicFormTestComponent},
  {
    path: 'collections',
    canActivateChild: [AuthGuardService],
    loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule)
  },
  { path: 'form/:id', component: GeneratedFormComponent },
  { path: 'formcomplete/:id', component: FormCompleteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
