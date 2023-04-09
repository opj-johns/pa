import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {path:'', component: EmployeeComponent},
  {path:'form', component: EmployeeFormComponent},
  {path:'form/:id', component: EmployeeFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
