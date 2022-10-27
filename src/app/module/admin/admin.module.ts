import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './../../component/admin/dashboard/dashboard.component';
import { BaseModule } from 'src/app/shared/base/base.module';
import { AdminHomeComponent } from 'src/app/component/admin/admin-home/admin-home.component';
import { ChartsModule } from 'src/app/shared/charts/charts.module';
import { OrderComponent } from 'src/app/component/admin/order/order.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { OrderProductTableComponent } from 'src/app/component/admin/order-product-table/order-product-table.component';
import { CartTableComponent } from 'src/app/component/admin/cart-table/cart-table.component';
import { ClientTableComponent } from 'src/app/component/admin/client-table/client-table.component';
import { ClientComponent } from 'src/app/component/admin/client/client.component';
import { ProductComponent } from 'src/app/component/admin/product/product.component';
import { StockProductTableComponent } from 'src/app/component/admin/stock-product-table/stock-product-table.component';
import { ClientFormComponent } from 'src/app/component/admin/client-form/client-form.component';
import { SupplierComponent } from 'src/app/component/admin/supplier/supplier.component';
import { SupplierTableComponent } from 'src/app/component/admin/supplier-table/supplier-table.component';
import { EmployeeComponent } from 'src/app/component/admin/employee/employee.component';
import { EmployeeTableComponent } from 'src/app/component/admin/employee-table/employee-table.component';
import { OrderDetailComponent } from 'src/app/component/admin/order-detail/order-detail.component';
import { SettingsComponent } from 'src/app/component/admin/settings/settings.component';
import { FinanceComponent } from 'src/app/component/admin/finance/finance.component';
import { EmployeeFormComponent } from 'src/app/component/admin/employee-form/employee-form.component';
import { PurchaseComponent } from 'src/app/component/admin/purchase/purchase.component';
import { StockProductFormComponent } from 'src/app/component/admin/stock-product-form/stock-product-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminHomeComponent,
    OrderComponent,
    CartTableComponent,
    ClientComponent,
    ClientTableComponent,
    ProductComponent,
    OrderProductTableComponent,
    StockProductTableComponent,
    ClientFormComponent,
    SupplierComponent,
    SupplierTableComponent,
    EmployeeComponent,
    EmployeeTableComponent,
    OrderDetailComponent,
    SettingsComponent,
    FinanceComponent,
    EmployeeFormComponent,
    PurchaseComponent,
    StockProductFormComponent
  ],
  imports: [
    AdminRoutingModule,
    BaseModule,
    ChartsModule,
    AngularMaterialModule,
  ]
})
export class AdminModule { }
