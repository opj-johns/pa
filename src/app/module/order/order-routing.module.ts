import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentReceiptComponent } from './components/payment-receipt/payment-receipt.component';

const routes: Routes = [
  {path:'', component: OrderComponent},
  {path:'detail', component: OrderDetailComponent},
  {path:'payment-receipt/:orderId', component: PaymentReceiptComponent},
  {path:'payment-receipt/:orderId', component: PaymentReceiptComponent},
  {path:':id', component: OrderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
