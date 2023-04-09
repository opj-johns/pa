import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { EmployeeComponent } from 'src/app/module/employee/components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';


@NgModule({
  declarations: [
    EmployeeComponent, 
    EmployeeFormComponent, 
    EmployeeTableComponent, 
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
