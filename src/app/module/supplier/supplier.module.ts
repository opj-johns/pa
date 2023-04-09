import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierTableComponent } from './components/supplier-table/supplier-table.component';
import { SupplierComponent } from './components/supplier/supplier.component';


@NgModule({
  declarations: [
    SupplierComponent,
    SupplierTableComponent, 
    SupplierFormComponent,
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
