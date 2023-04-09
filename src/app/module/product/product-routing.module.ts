import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { StockProductFormComponent } from './components/stock-product-form/stock-product-form.component';

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'form', component: StockProductFormComponent},
  {path: 'form/:id', component: StockProductFormComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

