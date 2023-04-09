import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierComponent } from './components/supplier/supplier.component';

const routes: Routes = [
  {path:'', component: SupplierComponent},
  {path:'form', component: SupplierFormComponent},
  {path:'form/:id', component: SupplierFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
