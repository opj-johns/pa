import { NgModule } from '@angular/core';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { PurchaseComponent } from 'src/app/module/purchase/components/purchase/purchase.component';
import { PurchaseTableComponent } from './components/purchase-table/purchase-table.component';
import { MakePurchaseComponent } from './components/make-purchase/make-purchase.component';
import { PurchaseDateComponent } from './components/purchase-date/purchase-date.component';
import { PurchaseTTCComponent } from './components/purchase-ttc/purchase-ttc.component';
import { SupplierProductTableComponent } from './components/supplier-product-table/supplier-product-table.component';
import { PurchaseCartTableComponent } from './components/purchase-cart-table/purchase-cart-table.component';
import { SupplierSelectComponent } from './components/supplier-select/supplier-select.component';
import { PurchaseDetailDialogComponent } from './components/purchase-detail-dialog/purchase-detail-dialog.component';
import { PurchaseProductsDialogComponent } from './components/purchase-products-dialog/purchase-products-dialog.component';
import { PurchasePaymentComponent } from './component/purchase-payment/purchase-payment.component';

import { PurchasePaymentHistoryDialogComponent } from './component/purchase-payment-history-dialog/purchase-payment-history-dialog.component';
import { PurchaseReceiptComponent } from './components/purchase-receipt/purchase-receipt.component';
import { PurchasedProductsTableComponent } from './components/purchased-products-table/purchased-products-table.component';
import { PurchasePaymentHistoryTableComponent } from './components/purchase-payment-history-table/purchase-payment-history-table.component';



@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseTableComponent,
    MakePurchaseComponent,
    PurchaseDateComponent,
    PurchaseTTCComponent,
    SupplierProductTableComponent,
    PurchaseCartTableComponent,
    SupplierSelectComponent,
    PurchaseDetailDialogComponent,
    PurchaseProductsDialogComponent,
    PurchasePaymentComponent,
    PurchasePaymentHistoryDialogComponent,
    PurchaseReceiptComponent,
    PurchasedProductsTableComponent,
    PurchasePaymentHistoryTableComponent,
  ],
  imports: [
    BaseModule,
    AngularMaterialModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
