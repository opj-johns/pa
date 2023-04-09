import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderPaymentHistoryComponent } from './components/order-payment-history/order-payment-history.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';
import { OrderComponent } from './components/order/order.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CommandTableComponent } from './components/command-table/command-table.component';
import { OrderPaymentHistoryDialogComponent } from './components/order-payment-history-dialog/order-payment-history-dialog.component';
import { OrderProductTableComponent } from './components/order-product-table/order-product-table.component';
import { OrderedProducsDialogComponent } from './components/ordered-producs-dialog/ordered-producs-dialog.component';
import { OrderedProductsTableComponent } from './components/ordered-products-table/ordered-products-table.component';
import { PaymentReceiptComponent } from './components/payment-receipt/payment-receipt.component';


@NgModule({
  declarations: [
    OrderComponent,
    CartTableComponent, 
    OrderProductTableComponent,
    OrderDetailComponent, 
    CommandTableComponent, 
    OrderedProducsDialogComponent,
    OrderPaymentComponent,
    OrderPaymentHistoryDialogComponent, 
    PaymentReceiptComponent, 
    OrderedProductsTableComponent, 
    OrderPaymentHistoryComponent, 
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
