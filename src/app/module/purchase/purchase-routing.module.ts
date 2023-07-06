import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from 'src/app/module/purchase/components/purchase/purchase.component';
import { MakePurchaseComponent } from './components/make-purchase/make-purchase.component';
import { PurchaseReceiptComponent } from './components/purchase-receipt/purchase-receipt.component';

const routes: Routes = [
  {path:'all', component: PurchaseComponent},
  {path:'new', component: MakePurchaseComponent,},
  {path:':id', component: MakePurchaseComponent,},
  {path:'payment-receipt/:purchaseId', component: PurchaseReceiptComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
