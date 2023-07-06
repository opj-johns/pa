import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "src/app/component/admin/admin-home/admin-home.component";
import { DashboardComponent } from "src/app/component/admin/dashboard/dashboard.component";
import { SettingsComponent } from "src/app/component/admin/settings/settings.component";

const routes:Routes=[
    {path:'', component: AdminHomeComponent, children:[
        {path: 'dashboard', component: DashboardComponent},
        {path:'order', loadChildren:()=> import('./../order/order.module').then(m=>m.OrderModule)},
        {path:'client', loadChildren:()=> import('./../client/client.module').then(m=>m.ClientModule)},
        {path:'product', loadChildren:()=> import('./../product/product.module').then(m=>m.ProductModule)},
        {path:'supplier', loadChildren:()=> import('./../supplier/supplier.module').then(m=>m.SupplierModule)},
        {path:'employee', loadChildren:()=> import('./../employee/employee.module').then(m=>m.EmployeeModule)},
        {path:'purchase', loadChildren:()=> import('./../purchase/purchase.module').then(m=>m.PurchaseModule)},
        {path:'expense', loadChildren:()=> import('./../expense/expense.module').then(m=>m.ExpenseModule)},
        {path:'settings', component: SettingsComponent}, 
        {path: '', component: DashboardComponent},
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)]
})
export class AdminRoutingModule{} 