import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "src/app/component/admin/admin-home/admin-home.component";
import { ClientFormComponent } from "src/app/component/admin/client-form/client-form.component";
import { ClientComponent } from "src/app/component/admin/client/client.component";
import { DashboardComponent } from "src/app/component/admin/dashboard/dashboard.component";
import { EmployeeFormComponent } from "src/app/component/admin/employee-form/employee-form.component";
import { EmployeeComponent } from "src/app/component/admin/employee/employee.component";
import { FinanceComponent } from "src/app/component/admin/finance/finance.component";
import { OrderDetailComponent } from "src/app/component/admin/order-detail/order-detail.component";
import { OrderComponent } from "src/app/component/admin/order/order.component";
import { ProductComponent } from "src/app/component/admin/product/product.component";
import { SettingsComponent } from "src/app/component/admin/settings/settings.component";
import { StockProductFormComponent } from "src/app/component/admin/stock-product-form/stock-product-form.component";
import { SupplierFormComponent } from "src/app/component/admin/supplier-form/supplier-form.component";
import { SupplierComponent } from "src/app/component/admin/supplier/supplier.component";

const routes:Routes=[
    {path:'', component: AdminHomeComponent, children:[
        {path: 'dashboard', component: DashboardComponent},
        {path:'order', component: OrderComponent},
        {path:'client', component: ClientComponent},
        {path:'product', component: ProductComponent},
        {path:'supplier', component: SupplierComponent},
        {path:'employee', component: EmployeeComponent},
        {path:'settings', component: SettingsComponent}, 
        {path:'finance', component: FinanceComponent}, 
        {path:'order-detail', component: OrderDetailComponent},
        {path:'client/form', component: ClientFormComponent},
        {path:'supplier/form', component: SupplierFormComponent},
        {path:'employee/form', component: EmployeeFormComponent},
        {path:'product/form', component: StockProductFormComponent},
        {path:'client/form/:id', component: ClientFormComponent},
        {path:'supplier/form/:id', component: SupplierFormComponent},
        {path:'employee/form/:id', component: EmployeeFormComponent},
        {path:'product/form/:id', component: StockProductFormComponent},
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class AdminRoutingModule{} 