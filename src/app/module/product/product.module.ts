import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ProductComponent } from 'src/app/module/product/components/product/product.component';
import { StockProductFormComponent } from './components/stock-product-form/stock-product-form.component';
import { StockProductTableComponent } from './components/stock-product-table/stock-product-table.component';


@NgModule({
  declarations: [
    ProductComponent,
    StockProductTableComponent,
    StockProductFormComponent,
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
