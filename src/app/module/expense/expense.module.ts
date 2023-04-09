import { NgModule } from '@angular/core';

import { ExpenseRoutingModule } from './expense-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ExpenseComponent } from 'src/app/module/expense/components/expense/expense.component';


@NgModule({
  declarations: [
    ExpenseComponent
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
