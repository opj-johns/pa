import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from '../client/components/client-form/client-form.component';
import { ClientComponent } from '../client/components/client/client.component';

const routes: Routes = [
  {path: '', component: ClientComponent},
  {path:'form', component: ClientFormComponent},
  {path:'form/:id', component: ClientFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
